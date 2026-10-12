import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Target, ListChecks, MessageCircleQuestion, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import LogoMark from '../components/LogoMark.jsx'
import { useAuth } from '../lib/auth.jsx'
import { berandaUntuk } from '../components/Rute.jsx'

const NILAI = [
  { Ikon: Target, judul: 'Misi Kontekstual', isi: 'Soal yang bentuknya berubah-ubah, supaya konsepmu tidak cuma hafal satu pola.' },
  { Ikon: ListChecks, judul: 'Strategy Builder', isi: 'Tunjukkan cara berpikirmu: konsep, model, dan jawaban.' },
  { Ikon: MessageCircleQuestion, judul: 'MathGuide', isi: 'Teman belajar yang memberi pertanyaan pemandu, bukan jawaban langsung.' },
]

function Panel() {
  return (
    <div className="hidden flex-col justify-between bg-brand p-10 text-white lg:flex">
      <div className="flex items-center gap-2">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white"><LogoMark className="h-8 w-auto" /></span>
        <span className="font-display text-2xl font-bold">MATRIKA</span>
      </div>
      <div>
        <h2 className="max-w-sm text-3xl font-semibold leading-tight">Latih transfer konsepmu</h2>
        <p className="mt-2 max-w-sm text-white/80">Bisa mengerjakan satu soal belum tentu bisa mengerjakan soal yang tampilannya berbeda. MATRIKA melatih yang kedua.</p>
        <ul className="mt-8 space-y-5">
          {NILAI.map(({ Ikon, judul, isi }) => (
            <li key={judul} className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15"><Ikon size={20} /></span>
              <span><span className="block font-semibold">{judul}</span><span className="text-sm text-white/80">{isi}</span></span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-white/60">Prototipe untuk lampiran esai. Data dan AI disimulasikan.</p>
    </div>
  )
}

function Sandi({ id, nilai, ubah, label = 'Kata sandi', autoComplete }) {
  const [lihat, setLihat] = useState(false)
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      <div className="relative">
        <input id={id} type={lihat ? 'text' : 'password'} value={nilai} onChange={(e) => ubah(e.target.value)} className="input pr-11" autoComplete={autoComplete} />
        <button type="button" onClick={() => setLihat(!lihat)} aria-label={lihat ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
          {lihat ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}

function Peran({ nilai, ubah }) {
  return (
    <div role="radiogroup" aria-label="Peran" className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
      {['siswa', 'guru'].map((p) => (
        <button key={p} type="button" role="radio" aria-checked={nilai === p} onClick={() => ubah(p)}
          className={`rounded-lg py-2 text-sm font-semibold capitalize ${nilai === p ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}>{p}</button>
      ))}
    </div>
  )
}

const Catatan = () => (
  <p className="mt-6 flex items-start gap-2 text-xs text-slate-500">
    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal" />Data belajarmu hanya dipakai untuk membantu pembelajaran.
  </p>
)

const Galat = ({ id, children }) => children ? <p id={id} role="alert" className="mt-1 text-xs text-red-600">{children}</p> : null

export function Login() {
  const { masuk } = useAuth()
  const nav = useNavigate()
  const [peran, setPeran] = useState('siswa')
  const [email, setEmail] = useState('')
  const [sandi, setSandi] = useState('')
  const [galat, setGalat] = useState({})

  const kirim = (e) => {
    e.preventDefault()
    const g = {}
    if (!email.trim()) g.email = 'Isi email atau username.'
    if (!sandi) g.sandi = 'Isi kata sandi.'
    setGalat(g)
    if (Object.keys(g).length) return
    const r = masuk({ email, sandi, peran })
    if (!r.ok) return setGalat({ umum: r.pesan })
    nav(berandaUntuk(r.user), { replace: true })
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <Panel />
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Logo tagline className="mb-8 lg:hidden" />
          <h1 className="text-2xl font-semibold">Masuk ke MATRIKA</h1>
          <form onSubmit={kirim} noValidate className="mt-6 space-y-4">
            <Peran nilai={peran} ubah={setPeran} />
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">Email atau username</label>
              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" autoComplete="username" aria-describedby="g-email" />
              <Galat id="g-email">{galat.email}</Galat>
            </div>
            <div>
              <Sandi id="sandi" nilai={sandi} ubah={setSandi} autoComplete="current-password" />
              <Galat>{galat.sandi}</Galat>
            </div>
            {galat.umum && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{galat.umum}</p>}
            <button className="btn btn-primary w-full">Masuk</button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-600">Belum punya akun? <Link to="/daftar" className="font-semibold text-brand hover:underline">Daftar akun baru</Link></p>

          <Catatan />
        </div>
      </div>
    </div>
  )
}

export function Daftar() {
  const { daftar } = useAuth()
  const nav = useNavigate()
  const [f, setF] = useState({ peran: 'siswa', nama: '', kelas: '7', email: '', sandi: '', ulang: '' })
  const [galat, setGalat] = useState({})
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }))

  const kirim = (e) => {
    e.preventDefault()
    const g = {}
    if (f.nama.trim().length < 2) g.nama = 'Isi nama lengkapmu.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) g.email = 'Isi email yang valid, misalnya nama@sekolah.id.'
    if (f.sandi.length < 6) g.sandi = 'Kata sandi minimal 6 karakter.'
    if (f.ulang !== f.sandi) g.ulang = 'Konfirmasi kata sandi belum sama.'
    setGalat(g)
    if (Object.keys(g).length) return
    const r = daftar(f)
    if (!r.ok) return setGalat({ umum: r.pesan })
    nav(berandaUntuk(r.user), { replace: true })
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <Panel />
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Logo tagline className="mb-8 lg:hidden" />
          <h1 className="text-2xl font-semibold">Buat akun MATRIKA</h1>
          <form onSubmit={kirim} noValidate className="mt-6 space-y-4">
            <Peran nilai={f.peran} ubah={set('peran')} />
            <div>
              <label htmlFor="nama" className="mb-1 block text-sm font-medium">Nama lengkap</label>
              <input id="nama" value={f.nama} onChange={(e) => set('nama')(e.target.value)} className="input" autoComplete="name" />
              <Galat>{galat.nama}</Galat>
            </div>
            {f.peran === 'siswa' && (
              <div>
                <label htmlFor="kelas" className="mb-1 block text-sm font-medium">Kelas</label>
                <select id="kelas" value={f.kelas} onChange={(e) => set('kelas')(e.target.value)} className="input">
                  <option value="7">Kelas 7 SMP</option><option value="8">Kelas 8 SMP</option><option value="9">Kelas 9 SMP</option>
                </select>
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
              <input id="email" value={f.email} onChange={(e) => set('email')(e.target.value)} className="input" autoComplete="email" />
              <Galat>{galat.email}</Galat>
            </div>
            <div><Sandi id="sandi" nilai={f.sandi} ubah={set('sandi')} autoComplete="new-password" /><Galat>{galat.sandi}</Galat></div>
            <div><Sandi id="ulang" label="Ulangi kata sandi" nilai={f.ulang} ubah={set('ulang')} autoComplete="new-password" /><Galat>{galat.ulang}</Galat></div>
            {galat.umum && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{galat.umum}</p>}
            <button className="btn btn-primary w-full">Daftar</button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-600">Sudah punya akun? <Link to="/login" className="font-semibold text-brand hover:underline">Masuk</Link></p>
          <Catatan />
        </div>
      </div>
    </div>
  )
}
