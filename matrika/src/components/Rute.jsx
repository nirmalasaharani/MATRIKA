import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'

export const berandaUntuk = (user) => (user.peran === 'guru' ? '/guru' : '/beranda')

export function RuteSiswa() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.peran !== 'siswa') return <Navigate to="/guru" replace />
  return <Outlet />
}
export function RuteGuru() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.peran !== 'guru') return <Navigate to="/beranda" replace />
  return <Outlet />
}
export function RuteTamu() {
  const { user } = useAuth()
  if (user) return <Navigate to={berandaUntuk(user)} replace />
  return <Outlet />
}
