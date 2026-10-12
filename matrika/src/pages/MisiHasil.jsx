import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, X, HandHelping, ArrowRight, PartyPopper, Trophy, RotateCcw } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { BLOK_MISI } from '../data/latihan-misi.js'
import { SOAL_BY_ID } from '../data/misi-spldv.js'
import { CONTOH_MATHGUIDE } from '../data/mathguide.js'
import { NAMA_LEVEL, NAMA_POLA, ringkasan } from '../lib/alur.js'
import { muatBlok, kuota } from '../lib/progresMisi.js'
import { kalimatPola } from '../lib/polaVariasi.js'

const Sinyal = ({ label, ok, catatan }) => (
  <div className={`rounded-xl p-3 ring-1 ${ok ? 'bg-teal-soft ring-teal/30' : 'bg-red-50 ring-red-200'}`}>
    <p className="flex items-center gap-2 text-sm font-semibold">
      <span className={`grid h-6 w-6 place-items-center rounded-full text-white ${ok ? 'bg-teal' : 'bg-red-500'}`}>{ok ? <Check size={14} /> : <X size={14} />}</span>{label}
    </p>
    {!ok && catatan && <p className="mt-1 text-xs text-slate-700">{catatan}</p>}
  </div>
)

function Alur() {
  const Kotak = ({ children, cls = '' }) => <div className={`rounded-xl px-3 py-2 text-center text-xs font-semibold ${cls}`}>{children}</div>
  return (
    <div className="flex flex-col items-center gap-2 text-xs" aria-label="Diagram alur MATRIKA">
      <Kotak cls="bg-teal-soft text-teal">Siswa SMP (input)</Kotak>
      <span aria-hidden>↓ 1. Mengerjakan permasalahan</span>
      <div className="w-full max-w-sm rounded-xl border-2 border-dashed border-brand/50 bg-brand-soft/50 p-3">
        <p className="mb-2 text-center font-semibold text-brand">MATRIKA Core System</p>
        <div className="grid grid-cols-2 gap-2"><Kotak cls="bg-brand text-white">Misi Kontekstual</Kotak><Kotak cls="bg-brand text-white">Strategy Builder</Kotak></div>
        <div className="mt-2 flex justify-center"><Kotak cls="bg-brand text-white">MathGuide (AI)</Kotak></div>
        <Kotak cls="mt-2 bg-white text-slate-700 ring-1 ring-slate-200">Analisis respons dan penentuan variasi</Kotak>
      </div>
      <span aria-hidden>↓ 2. Soal berikutnya</span>
      <Kotak cls="bg-sun-soft text-sun">Permasalahan berikutnya (output sistem)</Kotak>
      <span aria-hidden className="text-teal">↺ 3. Mengerjakan permasalahan berikutnya (loop pembelajaran adaptif)</span>
    </div>
  )
}

export default function MisiHasil() {
  const { blokId } = useParams()
  const { user } = useAuth()
  const blok = BLOK_MISI.find((b) => b.id === Number(blokId))
  if (!blok) return <Navigate to="/misi" replace />
  const data = muatBlok(user.id, blok)
  const t = data.terakhir
  if (!t) return <Navigate to={`/misi/${blok.id}`} replace />
  const soal = SOAL_BY_ID[t.soalId]
  const sebelum = t.idSebelumnya ? SOAL_BY_ID[t.idSebelumnya] : null
  const { hasil, keputusan: k } = t
  const slot = blok.slots[k.slot - 1]
  const r = ringkasan(data.progres)
  const habis = kuota(user.id).sisa <= 0

  const kepala = k.jenis === 'lanjut'
    ? (k.percobaanKe === 1 ? 'Hebat! Jawabanmu benar.' : `Bagus! Kamu berhasil di percobaan ke-${k.percobaanKe}.`)
    : k.jenis === 'ulang' ? 'Belum tepat, tapi tidak apa-apa.' : 'Kita lihat contoh langkahnya, lalu lanjut ya.'
  const isi = k.jenis === 'lanjut'
    ? (k.tuntas ? 'Ini soal terakhir di latihan ini.' : `Lanjut ke soal ${k.slotBerikutnya} dari 12.`)
    : k.jenis === 'ulang' ? `Coba versi lain dari soal ini (percobaan ${k.percobaanKe + 1} dari ${k.maksPercobaan}). MathGuide level 1 akan terbuka otomatis.`
    : 'Soal ini ditandai "dilewati dengan pembahasan" dan dicatat untuk gurumu.'
  const warna = k.jenis === 'lanjut' ? 'bg-teal text-white' : k.jenis === 'ulang' ? 'bg-sun text-white' : 'bg-slate-600 text-white'

  const levelSlots = k.levelTutup ? blok.slots.filter((s) => s.level === k.levelTutup).map((s) => data.progres.slot[s.slot].status) : []
  const hit = (s) => levelSlots.filter((x) => x === s).length

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <p className="text-sm text-slate-500">{blok.judul} · Soal {k.slot}: {NAMA_POLA[slot.pola]} ({NAMA_LEVEL[slot.level]})</p>

      <div className={`rounded-xl2 p-6 ${warna}`}>
        <h1 className="text-2xl font-semibold">{kepala}</h1>
        <p className="mt-1 text-white/90">{isi}</p>
      </div>

      {k.tuntas && (
        <div className="rounded-xl2 bg-teal-soft p-6">
          <p className="flex items-center gap-2 text-lg font-semibold text-teal"><Trophy />{blok.judul} tuntas!</p>
          <p className="mt-1 text-sm text-slate-700">Lulus langsung {r['lulus-langsung']}, lulus setelah ulang {r['lulus-ulang']}, dilewati dengan pembahasan {r.dilewati}.</p>
        </div>
      )}
      {k.levelTutup && !k.tuntas && (
        <div className="rounded-xl2 bg-brand-soft p-5">
          <p className="flex items-center gap-2 font-semibold text-brand"><PartyPopper size={18} />Level {NAMA_LEVEL[k.levelTutup]} selesai!</p>
          <p className="mt-1 text-sm text-slate-700">Lulus langsung {hit('lulus-langsung')}, lulus setelah ulang {hit('lulus-ulang')}, dilewati {hit('dilewati')}.</p>
        </div>
      )}

      <section className="card p-5" aria-label="Sinyal penilaian">
        <h2 className="mb-3 font-semibold">Hasil {soal.judul}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Sinyal label="Konsep" ok={hasil.konsep} catatan={hasil.catatan.konsep} />
          <Sinyal label="Pemodelan" ok={hasil.pemodelan} catatan={hasil.catatan.pemodelan} />
          <Sinyal label="Prosedur" ok={hasil.prosedur} catatan={hasil.catatan.prosedur} />
          <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
            <p className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"><HandHelping size={14} /></span>Bantuan {t.bantuan}x</p>
            <p className="mt-1 text-xs text-slate-600">MathGuide hanya dicatat untuk gurumu, tidak mengurangi kemajuanmu.</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
          <p className="font-semibold">Pembahasan singkat</p>
          <p className="mt-1"><span className="text-slate-500">Model:</span> {soal.kunci.persamaan.join('  ;  ')}</p>
          <p><span className="text-slate-500">Penyelesaian:</span> {soal.kunci.hasil}</p>
        </div>
        {k.jenis === 'dilewati' && (() => { const c = CONTOH_MATHGUIDE[soal.mg.level3]; return (
          <div className="mt-4 rounded-xl bg-sun-soft p-4 text-sm">
            <p className="font-semibold text-sun">{c.judul}</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">{c.langkah.map((l, i) => <li key={i}>{l}</li>)}</ol>
          </div>) })()}
      </section>

      <section className="card p-5">
        <h2 className="font-semibold">Apa yang berubah dan apa yang tetap?</h2>
        <p className="mt-2 text-sm leading-relaxed">{kalimatPola(sebelum, soal)}</p>
        <p className="mt-2 text-xs text-slate-500">Hanya informasi, tidak ikut dinilai.</p>
      </section>

      <details className="card p-5">
        <summary className="cursor-pointer font-semibold">Bagaimana MATRIKA memilih soal ini?</summary>
        <div className="mt-4"><Alur /></div>
        <p className="mt-4 text-sm text-slate-600">Aturannya: jawaban benar membuka soal berikutnya; jawaban belum tepat memunculkan soal dengan pola yang sama tetapi konteks dan angka berbeda. Foto tidak memengaruhi keputusan.</p>
      </details>

      <div className="flex flex-wrap gap-3">
        {k.tuntas ? (<>
          <Link to="/misi" className="btn btn-primary">Pilih latihan lain <ArrowRight size={16} /></Link>
          <Link to={`/misi/${blok.id}`} className="btn btn-ghost"><RotateCcw size={16} />Lihat jalur</Link>
        </>) : habis ? (<>
          <Link to="/paket" className="btn btn-primary">Kuota habis, lihat paket</Link>
          <Link to={`/misi/${blok.id}`} className="btn btn-ghost">Lihat jalur</Link>
        </>) : (<>
          <Link to={`/misi/${blok.id}/soal`} className="btn btn-primary">Lanjut ke soal berikutnya <ArrowRight size={16} /></Link>
          <Link to={`/misi/${blok.id}`} className="btn btn-ghost">Lihat jalur</Link>
        </>)}
      </div>
    </div>
  )
}
