import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, RotateCcw, SkipForward, Lock, Play, Target, Hourglass, ChevronLeft, PartyPopper } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { BLOK_MISI } from '../data/latihan-misi.js'
import { SOAL_BY_ID } from '../data/misi-spldv.js'
import { blokTersedia, ringkasan, NAMA_LEVEL, NAMA_POLA } from '../lib/alur.js'
import { muatBlok, resetBlok, kuota, resetKuota } from '../lib/progresMisi.js'
import { KONFIG } from '../data/konfigurasi.js'

export const STATUS = {
  belum: { label: 'Belum', cls: 'bg-slate-100 text-slate-400', Ikon: Lock },
  sekarang: { label: 'Sekarang', cls: 'bg-sun text-white ring-4 ring-sun/30', Ikon: Play },
  'lulus-langsung': { label: 'Lulus langsung', cls: 'bg-teal text-white', Ikon: Check },
  'lulus-ulang': { label: 'Lulus setelah ulang', cls: 'bg-brand text-white', Ikon: RotateCcw },
  dilewati: { label: 'Dilewati dengan pembahasan', cls: 'bg-slate-500 text-white', Ikon: SkipForward },
}

const KuotaInfo = ({ uid }) => {
  const k = kuota(uid)
  return <span className="rounded-full bg-sun-soft px-3 py-1 text-xs font-semibold text-sun">Kuota Misi hari ini: {k.sisa}/{KONFIG.kuotaHarianMisi}</span>
}

export function MisiIndex() {
  const { user } = useAuth()
  const [, paksa] = useState(0)
  const blokAktif = BLOK_MISI.filter((b) => b.aktif)
  const resetSemua = () => {
    if (!window.confirm('Reset semua blok dan kuota? Progres Misi akan dihapus.')) return
    BLOK_MISI.forEach((b) => resetBlok(user.id, b.id)); resetKuota(user.id); paksa((n) => n + 1)
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl"><Target className="text-brand" />Misi Kontekstual</h1>
          <p className="mt-1 max-w-2xl text-slate-600">Konsepnya tetap, soalnya berubah bentuk. Tiap latihan berisi 12 soal dari mudah sampai HOTS. Tidak ada timer, kerjakan dengan tenang.</p>
        </div>
        <KuotaInfo uid={user.id} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {blokAktif.map((b) => {
          const ada = blokTersedia(b)
          const d = ada ? muatBlok(user.id, b) : null
          const r = d ? ringkasan(d.progres) : null
          const mulai = r && r.selesai > 0
          const status = !ada ? 'Soal sedang disiapkan' : d.progres.selesai ? 'Selesai' : mulai ? 'Berjalan' : 'Belum mulai'
          const inti = (
            <>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">{b.judul}</h2>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${!ada ? 'bg-slate-100 text-slate-500' : status === 'Selesai' ? 'bg-teal-soft text-teal' : status === 'Berjalan' ? 'bg-sun-soft text-sun' : 'bg-brand-soft text-brand'}`}>{status}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-brand">{b.tema}</p>
              <p className="mt-1 text-sm text-slate-500">{b.deskripsi}</p>
              {b.id > 1 && <p className="mt-2 text-xs text-slate-500">Disarankan setelah Latihan 1</p>}
              <div className="mt-4">
                {ada ? (<>
                  <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand" style={{ width: `${(r.selesai / 12) * 100}%` }} /></div>
                  <p className="mt-1 text-xs text-slate-500">{r.selesai}/12 soal</p>
                </>) : <p className="flex items-center gap-2 text-sm text-slate-500"><Hourglass size={16} />Segera tersedia</p>}
              </div>
            </>
          )
          return ada
            ? <Link key={b.id} to={`/misi/${b.id}`} className="card block p-5 transition-shadow hover:shadow-md">{inti}</Link>
            : <div key={b.id} className="card p-5 opacity-70" aria-disabled="true">{inti}<button disabled className="btn btn-ghost mt-4 w-full">Mulai</button></div>
        })}
      </div>
      <button onClick={resetSemua} className="text-sm text-slate-500 underline hover:text-brand">Reset semua blok (untuk demo)</button>
    </div>
  )
}

export function MisiJalur() {
  const { blokId } = useParams()
  const { user } = useAuth()
  const blok = BLOK_MISI.find((b) => b.id === Number(blokId))
  const [data, setData] = useState(() => (blok ? muatBlok(user.id, blok) : null))
  const [pilih, setPilih] = useState(null)
  if (!blok || !blokTersedia(blok)) return <Navigate to="/misi" replace />
  const p = data.progres
  const r = ringkasan(p)
  const k = kuota(user.id)
  const mulai = r.selesai > 0
  const ulang = () => {
    if (!window.confirm('Ulangi blok ini dari awal? Progres blok ini akan dihapus.')) return
    resetBlok(user.id, blok.id); setData(muatBlok(user.id, blok)); setPilih(null)
  }
  const sel = pilih ? p.slot[pilih] : null
  const selSlot = pilih ? blok.slots[pilih - 1] : null
  return (
    <div className="space-y-6">
      <Link to="/misi" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"><ChevronLeft size={16} />Semua latihan misi</Link>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">{blok.judul}</h1>
          <p className="text-slate-600">{blok.tema} · {r.selesai}/12 soal</p>
        </div>
        <KuotaInfo uid={user.id} />
      </div>

      {p.selesai ? (
        <div className="rounded-xl2 bg-teal-soft p-6">
          <p className="flex items-center gap-2 text-lg font-semibold text-teal"><PartyPopper />Latihan ini sudah tuntas!</p>
          <p className="mt-1 text-sm text-slate-700">Lulus langsung {r['lulus-langsung']}, lulus setelah ulang {r['lulus-ulang']}, dilewati dengan pembahasan {r.dilewati}.</p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-xl2 bg-brand p-5 text-white">
          <div className="grow">
            <p className="font-semibold">{mulai ? `Lanjutkan dari soal ${p.slotSekarang}` : 'Siap mulai?'}</p>
            <p className="text-sm text-white/80">Misi Kontekstual tidak memakai timer, kerjakan dengan tenang.</p>
          </div>
          {k.sisa > 0
            ? <Link to={`/misi/${blok.id}/soal`} className="btn bg-white text-brand hover:bg-brand-soft"><Play size={16} />{mulai ? 'Lanjutkan' : 'Mulai'}</Link>
            : <Link to="/paket" className="btn bg-white text-brand">Kuota habis, lihat paket</Link>}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {['mudah', 'sedang', 'hots'].map((lv) => (
          <section key={lv} className="card p-4" aria-label={`Level ${NAMA_LEVEL[lv]}`}>
            <h2 className="mb-3 font-semibold">Level {NAMA_LEVEL[lv]}</h2>
            <ol className="space-y-2">
              {blok.slots.filter((s) => s.level === lv).map((s) => {
                const st = p.slot[s.slot].status
                const M = STATUS[st]
                const bisaKlik = st !== 'belum' && st !== 'sekarang'
                return (
                  <li key={s.slot}>
                    <button disabled={!bisaKlik} onClick={() => setPilih(s.slot)} aria-label={`Soal ${s.slot}, ${NAMA_POLA[s.pola]}, ${M.label}`}
                      className={`flex w-full items-center gap-3 rounded-xl p-2 text-left ${bisaKlik ? 'hover:bg-brand-soft' : ''} ${pilih === s.slot ? 'bg-brand-soft' : ''}`}>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${M.cls}`}><M.Ikon size={16} /></span>
                      <span><span className="block text-sm font-semibold">Soal {s.slot}: {NAMA_POLA[s.pola]}</span><span className="block text-xs text-slate-500">{M.label}</span></span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>

      {sel && (
        <div className="card p-5">
          <h2 className="font-semibold">Soal {pilih}: {NAMA_POLA[selSlot.pola]} ({NAMA_LEVEL[selSlot.level]})</h2>
          <p className="mt-1 text-sm text-slate-600">{STATUS[sel.status].label}, {sel.percobaan.length} percobaan.</p>
          <ul className="mt-3 space-y-1 text-sm">
            {sel.percobaan.map((x, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2">
                <span className="font-medium">Percobaan {i + 1}</span>
                <span className="text-slate-500">{SOAL_BY_ID[x.soalId]?.judul}</span>
                <span className={x.benar ? 'text-teal' : 'text-red-600'}>{x.benar ? 'benar' : 'belum tepat'}</span>
                <span className="text-slate-500">· bantuan MathGuide {x.sinyal.bantuan}x</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {mulai && <button onClick={ulang} className="text-sm text-slate-500 underline hover:text-brand">Ulangi blok ini dari awal</button>}
    </div>
  )
}
