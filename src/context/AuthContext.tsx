import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext, type Admin } from './auth'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
const STORAGE_KEY = 'ekd-admin-auth'

type StoredAuth = {
  accessToken: string
  admin: Admin
}

function readStoredAuth(): StoredAuth | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(readStoredAuth)
  // With a saved session, wait for the server's current copy of the user (permissions may have changed).
  const [isReady, setIsReady] = useState(() => auth === null)

  useEffect(() => {
    if (!auth) return
    let cancelled = false

    fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${auth.accessToken}` } })
      .then(async (response) => {
        if (cancelled) return
        if (response.status === 401) return logout()
        if (!response.ok) return
        const admin: Admin = await response.json()
        const next = { accessToken: auth.accessToken, admin }
        setAuth(next)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      })
      .catch(() => {}) // offline: keep the saved session
      .finally(() => {
        if (!cancelled) setIsReady(true)
      })

    return () => {
      cancelled = true
    }
    // Only on first load; later changes come from login/logout.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message ?? 'Incorrect email or password.')
    }

    setAuth(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function logout() {
    setAuth(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ admin: auth?.admin ?? null, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
