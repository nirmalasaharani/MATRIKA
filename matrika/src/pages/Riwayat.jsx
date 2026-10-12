import { Link } from 'react-router-dom'
import { History, Timer, ClipboardCheck, Target } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { bacaRiwayat } from '../lib/riwayat.js'
import { BLOK_MISI } from '../data/latihan-misi.js'
import { muatBlok } from '../lib/progresMisi.js'
import { ringkasan, blokTersedia } from '../lib/alur.js'

const tgl = (w) => new Date(w).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

export default function Riwayat() {
  const { user } = useAuth()
  const riw = bacaRiwayat(user.id)
  const misi = BLOK_MISI.filter((b) => b.aktif && blokTersedia(b)).map((b) => ({ b, r: ringkasan(muatBlok(user.id, b).progres) })).filter((x) => x.r.selesai > 0)
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl"><History className="text-brand" />Riwayat</h1>
      <section aria-label="Latihan dan try out">
        <h2 className="mb-3 text-lg font-semibold">Latihan dan Try Out</h2>
        {riw.length === 0 ? <div className="card p-6 text-sm text-slate-600">Belum ada riwayat. Coba <Link to="/latihan/biasa" className="font-semibold text-brand hover:underline">Latihan Biasa</Link> atau <Link to="/tryout" className="font-semibold text-brand hover:underline">Try Out</Link>.</div> : (
          <ul className="card divide-y divide-slate-100">
            {riw.map((r) => (
              <li key={r.waktu} className="flex items-center gap-3 p-4">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${r.jenis === 'tryout' ? 'bg-teal-soft text-teal' : 'bg-sun-soft text-sun'}`}>{r.jenis === 'tryout' ? <ClipboardCheck size={20} /> : <Timer size={20} />}</span>
                <span className="grow"><span className="block font-medium">{r.judul}</span><span className="text-xs text-slate-500">{tgl(r.waktu)} · {r.benar}/{r.total} benar</span></span>
                <span className="font-display text-xl font-semibold text-brand">{r.skor}</span>
              </li>))}
          </ul>)}
      </section>
      <section aria-label="Misi Kontekstual">
        <h2 className="mb-3 text-lg font-semibold">Misi Kontekstual</h2>
        {misi.length === 0 ? <div className="card p-6 text-sm text-slate-600">Belum ada misi yang dikerjakan.</div> : (
          <ul className="card divide-y divide-slate-100">
            {misi.map(({ b, r }) => (
              <li key={b.id}><Link to={`/misi/${b.id}`} className="flex items-center gap-3 p-4 hover:bg-brand-soft">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Target size={20} /></span>
                <span className="grow"><span className="block font-medium">{b.judul}</span><span className="text-xs text-slate-500">Lulus langsung {r['lulus-langsung']}, setelah ulang {r['lulus-ulang']}, dilewati {r.dilewati}</span></span>
                <span className="font-semibold text-brand">{r.selesai}/12</span></Link></li>))}
          </ul>)}
      </section>
    </div>
  )
}
