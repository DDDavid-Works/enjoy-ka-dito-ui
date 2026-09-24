import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
const STORAGE_KEY = 'ekd-admin-auth'

type Admin = {
  id: string
  email: string
  name: string
  role: string
}

type StoredAuth = {
  accessToken: string
  admin: Admin
}

type AuthContextValue = {
  admin: Admin | null
  isReady: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setAuth(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsReady(true)
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

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
