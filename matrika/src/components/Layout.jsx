import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Library, Dumbbell, User, ChevronDown, Target, Timer, ClipboardCheck, LogOut, History, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { useAuth } from '../lib/auth.jsx'
import { bacaAktivitas } from '../lib/aktivitas.js'
import { KONFIG } from '../data/konfigurasi.js'

const LATIHAN = [
  { ke: '/latihan/biasa', label: 'Latihan Biasa', ket: 'Campuran pilihan ganda dan isian, ada timer', Ikon: Timer },
  { ke: '/misi', label: 'Misi Kontekstual', ket: 'Soal bervariasi dengan Strategy Builder dan MathGuide', Ikon: Target, baru: true },
  { ke: '/tryout', label: 'Try Out', ket: 'Ujian isian dengan timer', Ikon: ClipboardCheck },
]

const navCls = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-brand-soft text-brand' : 'text-slate-600 hover:bg-slate-100'}`

function useKlikLuar(ref, tutup) {
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) tutup() }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [ref, tutup])
}

function MenuLatihan() {
  const [buka, setBuka] = useState(false)
  const ref = useRef(null)
  const { pathname } = useLocation()
  useKlikLuar(ref, () => setBuka(false))
  useEffect(() => setBuka(false), [pathname])
  const aktif = pathname.startsWith('/latihan') || pathname.startsWith('/misi') || pathname.startsWith('/tryout')
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setBuka(!buka)} aria-expanded={buka} aria-haspopup="menu"
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${aktif ? 'bg-brand-soft text-brand' : 'text-slate-600 hover:bg-slate-100'}`}>
        Latihan <ChevronDown size={16} className={buka ? 'rotate-180' : ''} />
      </button>
      {buka && (
        <div role="menu" className="absolute left-0 top-full z-30 mt-2 w-80 rounded-xl2 bg-white p-2 shadow-lg ring-1 ring-slate-200">
          {LATIHAN.map(({ ke, label, ket, Ikon, baru }) => (
            <Link key={ke} to={ke} role="menuitem" className="flex gap-3 rounded-xl p-3 hover:bg-brand-soft">
              <Ikon size={20} className="mt-0.5 shrink-0 text-brand" />
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  {label}
                  {baru && <span className="rounded-full bg-sun px-2 py-0.5 text-[11px] font-semibold text-white">Baru</span>}
                </span>
                <span className="block text-xs text-slate-500">{ket}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MenuProfil() {
  const { user, keluar } = useAuth()
  const nav = useNavigate()
  const [buka, setBuka] = useState(false)
  const ref = useRef(null)
  useKlikLuar(ref, () => setBuka(false))
  const inisial = user.nama.split(' ').map((s) => s[0]).slice(0, 2).join('')
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setBuka(!buka)} aria-label="Menu profil" aria-expanded={buka}
        className="grid h-9 w-9 place-items-center rounded-full bg-teal font-display text-sm font-semibold text-white">{inisial}</button>
      {buka && (
        <div role="menu" className="absolute right-0 top-full z-30 mt-2 w-52 rounded-xl2 bg-white p-2 shadow-lg ring-1 ring-slate-200">
          <p className="truncate px-3 py-2 text-sm font-semibold">{user.nama}</p>
          <Link to="/profil" onClick={() => setBuka(false)} role="menuitem" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-soft"><User size={16} />Profil</Link>
          <Link to="/riwayat" onClick={() => setBuka(false)} role="menuitem" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-soft"><History size={16} />Riwayat</Link>
          <button onClick={() => { keluar(); nav('/login') }} role="menuitem" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={16} />Keluar</button>
        </div>
      )}
    </div>
  )
}

function BottomSheetLatihan({ tutup }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/40 md:hidden" onClick={tutup}>
      <div className="w-full rounded-t-3xl bg-white p-4 pb-8" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Pilih latihan">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">Pilih latihan</h2>
          <button onClick={tutup} aria-label="Tutup" className="rounded-full p-2 hover:bg-slate-100"><X size={18} /></button>
        </div>
        {LATIHAN.map(({ ke, label, ket, Ikon, baru }) => (
          <Link key={ke} to={ke} onClick={tutup} className="flex gap-3 rounded-xl p-3 active:bg-brand-soft">
            <Ikon size={22} className="mt-0.5 shrink-0 text-brand" />
            <span>
              <span className="flex items-center gap-2 text-sm font-semibold">{label}
                {baru && <span className="rounded-full bg-sun px-2 py-0.5 text-[11px] font-semibold text-white">Baru</span>}
              </span>
              <span className="block text-xs text-slate-500">{ket}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function BottomNav() {
  const { pathname } = useLocation()
  const [sheet, setSheet] = useState(false)
  useEffect(() => setSheet(false), [pathname])
  const Item = ({ ke, Ikon, label }) => (
    <NavLink to={ke} className={({ isActive }) => `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${isActive ? 'text-brand' : 'text-slate-500'}`}>
      <Ikon size={22} />{label}
    </NavLink>
  )
  const latihanAktif = pathname.startsWith('/latihan') || pathname.startsWith('/misi') || pathname.startsWith('/tryout')
  return (
    <>
      <nav aria-label="Menu utama" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        <Item ke="/beranda" Ikon={Home} label="Beranda" />
        <Item ke="/materi" Ikon={BookOpen} label="Materi" />
        <Item ke="/bank-soal" Ikon={Library} label="Bank Soal" />
        <button onClick={() => setSheet(true)} className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${latihanAktif ? 'text-brand' : 'text-slate-500'}`}>
          <Dumbbell size={22} />Latihan
        </button>
        <Item ke="/profil" Ikon={User} label="Profil" />
      </nav>
      {sheet && <BottomSheetLatihan tutup={() => setSheet(false)} />}
    </>
  )
}

export default function Layout() {
  const { user } = useAuth()
  const akt = bacaAktivitas(user)
  const sisa = Math.max(0, KONFIG.kuotaHarianMisi - akt.kuotaMisiTerpakai)
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link to="/beranda" aria-label="MATRIKA, ke beranda"><Logo /></Link>
          <nav aria-label="Menu utama" className="ml-4 hidden items-center gap-1 md:flex">
            <NavLink to="/materi" className={navCls}>Materi</NavLink>
            <NavLink to="/bank-soal" className={navCls}>Bank Soal</NavLink>
            <MenuLatihan />
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/misi" title="Sisa kuota harian Misi Kontekstual" className="hidden rounded-full bg-sun-soft px-3 py-1.5 text-xs font-semibold text-sun sm:block">
              Kuota Misi: {sisa}/{KONFIG.kuotaHarianMisi}
            </Link>
            <MenuProfil />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6"><Outlet /></main>
      <BottomNav />
    </div>
  )
}
