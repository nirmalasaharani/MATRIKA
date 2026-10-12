import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Timer, Target, ClipboardCheck, ArrowRight, Play } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { soalKelas, babKelas, babById } from '../lib/konten.js'
import { acak } from '../lib/jawaban.js'
import { tambahRiwayat, catatJejak } from '../lib/riwayat.js'
import Ujian, { HasilUjian } from '../components/Ujian.jsx'
import { PilihKelas, KosongKelas } from './Materi.jsx'

export function LatihanHub() {
  const kartu = [
    { ke: '/latihan/biasa', Ikon: Timer, judul: 'Latihan Biasa', ket: 'Soal campuran pilihan ganda dan isian dari bab pilihanmu, dengan timer.', cls: 'bg-sun-soft text-sun' },
    { ke: '/misi', Ikon: Target, judul: 'Misi Kontekstual', ket: 'Soal yang bentuknya berubah-ubah, dilengkapi Strategy Builder dan MathGuide. Tanpa timer.', cls: 'bg-brand-soft text-brand', unggul: true },
    { ke: '/tryout', Ikon: ClipboardCheck, judul: 'Try Out', ket: 'Ujian dengan soal isian dan timer untuk menguji kesiapanmu.', cls: 'bg-teal-soft text-teal' },
  ]
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-semibold md:text-3xl">Latihan</h1><p className="mt-1 text-slate-600">Pilih jenis latihan yang kamu butuhkan.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        {kartu.map(({ ke, Ikon, judul, ket, cls, unggul }) => (
          <Link key={ke} to={ke} className={`card relative block p-6 transition-shadow hover:shadow-md ${unggul ? 'ring-2 ring-brand' : ''}`}>
            {unggul && <span className="absolute right-4 top-4 rounded-full bg-sun px-2.5 py-1 text-xs font-semibold text-white">Fitur unggulan</span>}
            <span className={`grid h-12 w-12 place-items-center rounded-xl ${cls}`}><Ikon size={24} /></span>
            <h2 className="mt-4 text-lg font-semibold">{judul}</h2>
            <p className="mt-1 text-sm text-slate-600">{ket}</p>
            <p className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand">Buka <ArrowRight size={16} /></p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function LatihanBiasa() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const babParam = babById(params.get('bab'))
  const [kelas, setKelas] = useState(babParam?.kelas || user.kelas || 8)
  const [babPilih, setBabPilih] = useState(babParam ? [babParam.id] : [])
  const [jumlah, setJumlah] = useState(10)
  const [durasi, setDurasi] = useState(20)
  const [fase, setFase] = useState('atur')
  const [sesi, setSesi] = useState(null)
  const [hasil, setHasil] = useState(null)

  const babs = babKelas(kelas)
  const pool = soalKelas(kelas).filter((s) => babPilih.length === 0 || babPilih.includes(s.babId))
  const opsi = [5, 10, 15, 20].filter((n) => n <= pool.length)
  const jml = Math.min(jumlah, pool.length)
  const toggle = (id) => setBabPilih((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]))

  const mulai = () => {
    const pg = acak(pool.filter((s) => s.tipe === 'pg')), isi = acak(pool.filter((s) => s.tipe === 'isian'))
    let nIsi = Math.min(isi.length, Math.round(jml * 0.4)), nPg = Math.min(pg.length, jml - nIsi)
    nIsi = Math.min(isi.length, jml - nPg)
    const soal = acak([...pg.slice(0, nPg), ...isi.slice(0, nIsi)]).map((s) => (s.tipe === 'pg' ? { ...s, pilihan: acak(s.pilihan) } : s))
    setSesi({ soal, durasi }); setFase('ujian')
  }
  const selesai = (h) => {
    const judul = `Latihan Biasa Kelas ${kelas}${babPilih.length === 1 ? `: ${babById(babPilih[0]).judul}` : ''}`
    tambahRiwayat(user.id, { jenis: 'latihan', judul, skor: h.skor, benar: h.benar, total: h.total })
    catatJejak(user.id, { jenis: 'Latihan Biasa', judul, ke: '/latihan/biasa' })
    setHasil({ ...h, judul }); setFase('hasil')
  }

  if (fase === 'ujian') return <Ujian judul="Latihan Biasa" soal={sesi.soal} durasiMenit={sesi.durasi} onSelesai={selesai} onBatal={() => { if (window.confirm('Keluar dari latihan? Jawabanmu tidak disimpan.')) setFase('atur') }} />
  if (fase === 'hasil') return <HasilUjian judul={hasil.judul} hasil={hasil} aksi={<><button onClick={() => setFase('atur')} className="btn btn-primary"><Play size={16} />Latihan lagi</button><button onClick={() => nav('/bank-soal')} className="btn btn-ghost">Ke Bank Soal</button></>} />

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div><h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl"><Timer className="text-sun" />Latihan Biasa</h1>
        <p className="mt-1 text-slate-600">Soal campuran pilihan ganda dan isian, dengan timer hitung mundur.</p></div>
      <div className="card space-y-5 p-5">
        <div><p className="mb-2 text-sm font-semibold">Kelas</p><PilihKelas nilai={kelas} ubah={(k) => { setKelas(k); setBabPilih([]) }} /></div>
        {babs.length === 0 ? <KosongKelas kelas={kelas} apa="Soal latihan" /> : (<>
          <div><p className="mb-2 text-sm font-semibold">Bab</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bab">
              <button onClick={() => setBabPilih([])} aria-pressed={babPilih.length === 0} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${babPilih.length === 0 ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'}`}>Campur semua bab</button>
              {babs.map((b) => <button key={b.id} onClick={() => toggle(b.id)} aria-pressed={babPilih.includes(b.id)} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${babPilih.includes(b.id) ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'}`}>{b.judul}</button>)}
            </div></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="jml" className="mb-1 block text-sm font-semibold">Jumlah soal</label>
              <select id="jml" className="input" value={jml} onChange={(e) => setJumlah(Number(e.target.value))}>{(opsi.length ? opsi : [pool.length]).map((n) => <option key={n} value={n}>{n} soal</option>)}</select></div>
            <div><label htmlFor="dur" className="mb-1 block text-sm font-semibold">Durasi</label>
              <select id="dur" className="input" value={durasi} onChange={(e) => setDurasi(Number(e.target.value))}>{[10, 15, 20, 30, 45].map((n) => <option key={n} value={n}>{n} menit</option>)}</select></div>
          </div>
          <p className="text-sm text-slate-500">Tersedia {pool.length} soal dari pilihanmu. Soal diacak setiap kali mulai.</p>
          <button onClick={mulai} disabled={pool.length === 0} className="btn btn-primary w-full py-3 text-base"><Play size={18} />Mulai latihan</button>
        </>)}
      </div>
    </div>
  )
}
