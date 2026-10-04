import { useState, type ReactNode } from 'react'
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
    <AuthContext.Provider value={{ admin: auth?.admin ?? null, isReady: true, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
