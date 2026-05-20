import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ color: '#b5ac97', padding: 40 }}>A carregar...</div>
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}
