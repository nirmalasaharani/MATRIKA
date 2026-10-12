import { Link } from 'react-router-dom'
import { BookOpen, Library, Timer, ClipboardCheck, ArrowRight, Target, Sparkles } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { bacaAktivitas } from '../lib/aktivitas.js'
import { BLOK_MISI } from '../data/latihan-misi.js'

const NAMA_LEVEL = (slot) => (slot <= 4 ? 'Mudah' : slot <= 8 ? 'Sedang' : 'HOTS')

const PINTASAN = [
  { ke: '/materi', Ikon: BookOpen, judul: 'Materi', ket: 'Baca ringkasannya atau tonton videonya.', warna: 'bg-brand-soft text-brand' },
  { ke: '/bank-soal', Ikon: Library, judul: 'Bank Soal', ket: 'Soal campuran semua bab, pilih kelasmu.', warna: 'bg-teal-soft text-teal' },
  { ke: '/latihan/biasa', Ikon: Timer, judul: 'Latihan Biasa', ket: 'Pilihan ganda dan isian dengan timer.', warna: 'bg-sun-soft text-sun' },
  { ke: '/tryout', Ikon: ClipboardCheck, judul: 'Try Out', ket: 'Ujian isian untuk menguji kesiapanmu.', warna: 'bg-brand-soft text-brand' },
]

export default function Beranda() {
  const { user } = useAuth()
  const akt = bacaAktivitas(user)
  const m = akt.misi
  const mulai = !m.blokTerakhir
  const blok = BLOK_MISI.find((b) => b.id === m.blokTerakhir)
  const slot = m.slotTerakhir || 1
  const persen = Math.round((m.selesaiSlot / 12) * 100)
  const kosong = !akt.terakhirDibuka.length && akt.skorTryOut == null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">Halo, {user.nama.split(' ')[0]}!</h1>
        <p className="text-slate-500">Kelas {user.kelas} SMP</p>
      </div>

      <section aria-labelledby="misi" className="rounded-xl2 bg-brand p-6 text-white md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <p className="flex items-center gap-2 text-sm text-white/80"><Target size={16} />Misi Kontekstual</p>
            <h2 id="misi" className="mt-1 text-2xl font-semibold">{mulai ? 'Mulai misi pertamamu' : `${blok?.judul}, soal ${slot} dari 12`}</h2>
            <p className="mt-1 text-white/80">{mulai ? 'Soalnya berubah bentuk, konsepnya tetap. Kerjakan tanpa timer.' : `Level ${NAMA_LEVEL(slot)}. Lanjutkan dari soal terakhirmu.`}</p>
            {!mulai && (
              <div className="mt-4 max-w-sm">
                <div className="h-2 rounded-full bg-white/25"><div className="h-2 rounded-full bg-sun" style={{ width: `${persen}%` }} /></div>
                <p className="mt-1 text-xs text-white/80">{m.selesaiSlot}/12 soal selesai</p>
              </div>
            )}
          </div>
          <Link to={m.blokTerakhir ? `/misi/${m.blokTerakhir}` : '/misi'} className="btn bg-white text-brand hover:bg-brand-soft md:px-6 md:py-3">{mulai ? 'Mulai misi' : 'Lanjutkan'} <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section aria-labelledby="progres">
        <h2 id="progres" className="mb-3 text-lg font-semibold">Progresmu</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ['Blok misi selesai', `${m.blokSelesai}/${BLOK_MISI.filter((b) => b.aktif).length}`],
            ['Bantuan MathGuide minggu ini', akt.mathguideMingguIni],
            ['Skor try out terakhir', akt.skorTryOut ?? '-'],
            ['Skor latihan terakhir', akt.skorLatihan ?? '-'],
          ].map(([l, v]) => (
            <div key={l} className="card p-4">
              <p className="font-display text-2xl font-semibold text-brand">{v}</p>
              <p className="text-xs text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="belajar">
        <h2 id="belajar" className="mb-3 text-lg font-semibold">Mulai belajar</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PINTASAN.map(({ ke, Ikon, judul, ket, warna }) => (
            <Link key={ke} to={ke} className="card block p-5 transition-shadow hover:shadow-md">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${warna}`}><Ikon size={20} /></span>
              <h3 className="mt-3 font-semibold">{judul}</h3>
              <p className="mt-1 text-sm text-slate-500">{ket}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="terakhir">
        <h2 id="terakhir" className="mb-3 text-lg font-semibold">Terakhir dibuka</h2>
        {kosong ? (
          <div className="card flex items-center gap-3 p-5 text-sm text-slate-600">
            <Sparkles className="shrink-0 text-sun" />Belum ada aktivitas. Yuk mulai dari <Link to="/materi" className="font-semibold text-brand hover:underline">Materi</Link>.
          </div>
        ) : (
          <ul className="card divide-y divide-slate-100">
            {akt.terakhirDibuka.map((t) => (
              <li key={t.judul}>
                <Link to={t.ke} className="flex items-center justify-between gap-3 p-4 hover:bg-brand-soft">
                  <span><span className="text-xs text-slate-500">{t.jenis}</span><span className="block font-medium">{t.judul}</span></span>
                  <ArrowRight size={16} className="shrink-0 text-slate-400" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
