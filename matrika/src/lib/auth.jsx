import { createContext, useContext, useState, useCallback } from 'react'

const KEY_USERS = 'matrika_users'
const KEY_SESSION = 'matrika_session'

const baca = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
const tulis = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* abaikan */ } }

const semuaAkun = () => baca(KEY_USERS, [])

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => baca(KEY_SESSION, null))

  const masuk = useCallback(({ email, sandi, peran }) => {
    const akun = semuaAkun().find((a) => a.email.toLowerCase() === email.trim().toLowerCase())
    if (!akun) return { ok: false, pesan: 'Email atau username belum terdaftar. Periksa penulisannya atau daftar akun baru.' }
    if (akun.sandi !== sandi) return { ok: false, pesan: 'Kata sandi tidak cocok. Coba lagi.' }
    if (akun.peran !== peran) return { ok: false, pesan: `Akun ini terdaftar sebagai ${akun.peran}. Ganti pilihan peran di atas.` }
    const sesi = { id: akun.id, nama: akun.nama, peran: akun.peran, kelas: akun.kelas, email: akun.email }
    tulis(KEY_SESSION, sesi); setUser(sesi)
    return { ok: true, user: sesi }
  }, [])

  const daftar = useCallback(({ nama, kelas, email, sandi, peran }) => {
    if (semuaAkun().some((a) => a.email.toLowerCase() === email.trim().toLowerCase()))
      return { ok: false, pesan: 'Email ini sudah dipakai. Masuk dengan akun tersebut atau pakai email lain.' }
    const baru = { id: 'u-' + Date.now(), peran, nama: nama.trim(), email: email.trim(), sandi, ...(peran === 'siswa' ? { kelas: Number(kelas) } : {}) }
    tulis(KEY_USERS, [...baca(KEY_USERS, []), baru])
    const sesi = { id: baru.id, nama: baru.nama, peran, kelas: baru.kelas, email: baru.email }
    tulis(KEY_SESSION, sesi); setUser(sesi)
    return { ok: true, user: sesi }
  }, [])

  const keluar = useCallback(() => { localStorage.removeItem(KEY_SESSION); setUser(null) }, [])

  return <AuthCtx.Provider value={{ user, masuk, daftar, keluar }}>{children}</AuthCtx.Provider>
}
