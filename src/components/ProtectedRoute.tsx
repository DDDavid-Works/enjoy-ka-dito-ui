import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import type { ModuleKey } from '../types/modules'

export default function ProtectedRoute({ children, module }: { children: ReactNode; module?: ModuleKey }) {
  const { admin, isReady } = useAuth()

  if (!isReady) return null
  if (!admin) return <Navigate to="/admin/login" replace />

  if (module && !admin.modules?.includes(module)) return <Navigate to="/admin" replace />

  return children
}
