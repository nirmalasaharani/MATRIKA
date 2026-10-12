import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, Clock, ListChecks, Play } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { TRYOUT } from '../lib/konten.js'
import { bacaRiwayat, tambahRiwayat, catatJejak } from '../lib/riwayat.js'
import Ujian, { HasilUjian } from '../components/Ujian.jsx'
import { PilihKelas, KosongKelas } from './Materi.jsx'

export default function TryOut() {
  const { user } = useAuth()
  const [kelas, setKelas] = useState(user.kelas || 8)
  const [paket, setPaket] = useState(null)
  const [hasil, setHasil] = useState(null)
  const riwayat = bacaRiwayat(user.id).filter((r) => r.jenis === 'tryout')
  const daftar = TRYOUT.filter((t) => t.kelas === kelas)
  const terbaik = (judul) => { const s = riwayat.filter((r) => r.judul === judul).map((r) => r.skor); return s.length ? Math.max(...s) : null }

  const selesai = (h) => {
    tambahRiwayat(user.id, { jenis: 'tryout', judul: paket.judul, skor: h.skor, benar: h.benar, total: h.total })
    catatJejak(user.id, { jenis: 'Try Out', judul: paket.judul, ke: '/tryout' })
    setHasil(h)
  }
  if (paket && hasil) return <HasilUjian judul={paket.judul} hasil={hasil} aksi={<button onClick={() => { setPaket(null); setHasil(null) }} className="btn btn-primary">Kembali ke daftar try out</button>} />
  if (paket) {
    const soal = paket.soal.map((s, i) => ({ id: `${paket.id}-${i + 1}`, tipe: 'isian', tingkat: 'campuran', ...s }))
    return <Ujian judul={paket.judul} soal={soal} durasiMenit={paket.durasiMenit} onSelesai={selesai} onBatal={() => { if (window.confirm('Keluar dari try out? Jawabanmu tidak disimpan.')) setPaket(null) }} />
  }
  return (
    <div className="space-y-6">
      <div><h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl"><ClipboardCheck className="text-teal" />Try Out</h1>
        <p className="mt-1 text-slate-600">Ujian dengan semua soal isian dan timer. Kerjakan seperti ujian sungguhan.</p></div>
      <PilihKelas nilai={kelas} ubah={setKelas} />
      {daftar.length === 0 ? <KosongKelas kelas={kelas} apa="Paket try out" /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {daftar.map((t) => { const best = terbaik(t.judul)
            return (
              <div key={t.id} className="card p-5">
                <h2 className="text-lg font-semibold">{t.judul}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Clock size={16} />{t.durasiMenit} menit</span>
                  <span className="flex items-center gap-1.5"><ListChecks size={16} />{t.soal.length} soal isian</span>
                  {best !== null && <span className="font-semibold text-teal">Skor terbaik: {best}</span>}
                </div>
                <button onClick={() => { setPaket(t); setHasil(null) }} className="btn btn-primary mt-4"><Play size={16} />Mulai try out</button>
              </div>) })}
        </div>
      )}
      <p className="text-sm text-slate-500">Riwayat skormu ada di <Link to="/riwayat" className="font-semibold text-brand hover:underline">halaman Riwayat</Link>.</p>
    </div>
  )
}
