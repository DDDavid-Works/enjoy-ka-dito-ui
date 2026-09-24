import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { admin, isReady } = useAuth()

  if (!isReady) return null
  if (!admin) return <Navigate to="/admin/login" replace />

  return children
}
