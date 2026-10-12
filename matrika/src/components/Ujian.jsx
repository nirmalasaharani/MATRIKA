import { useEffect, useRef, useState } from 'react'
import { Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Trophy } from 'lucide-react'
import { periksa } from '../lib/jawaban.js'
import { rapikan, NAMA_TINGKAT } from '../lib/tampil.js'
import { babById } from '../lib/konten.js'

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function Ujian({ judul, soal, durasiMenit, onSelesai, onBatal }) {
  const [i, setI] = useState(0)
  const [jaw, setJaw] = useState({})
  const [ragu, setRagu] = useState({})
  const [sisa, setSisa] = useState(durasiMenit * 60)
  const [konfirm, setKonfirm] = useState(false)
  const akhir = useRef(Date.now() + durasiMenit * 60000)
  const mulai = useRef(Date.now())
  const jawRef = useRef(jaw); jawRef.current = jaw
  const sudah = useRef(false)

  const kumpul = (habis = false) => {
    if (sudah.current) return
    sudah.current = true
    const items = soal.map((s) => ({ soal: s, jawab: jawRef.current[s.id] ?? '', benar: periksa(s, jawRef.current[s.id]) }))
    const benar = items.filter((x) => x.benar).length
    onSelesai({ items, benar, total: soal.length, skor: Math.round((benar / soal.length) * 100), detik: Math.round((Date.now() - mulai.current) / 1000), waktuHabis: habis })
  }
  useEffect(() => {
    const t = setInterval(() => { const s = Math.max(0, Math.round((akhir.current - Date.now()) / 1000)); setSisa(s); if (s === 0) kumpul(true) }, 500)
    return () => clearInterval(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const s = soal[i]
  const terjawab = (x) => (jaw[x.id] ?? '').toString().trim() !== ''
  const belum = soal.filter((x) => !terjawab(x)).length
  const jmlRagu = soal.filter((x) => ragu[x.id]).length
  const bab = s.babId ? babById(s.babId) : null

  return (
    <div className="mx-auto max-w-5xl pb-8">
      <div className="sticky top-14 z-10 -mx-4 mb-4 flex items-center justify-between gap-3 border-b border-slate-200 bg-paper/95 px-4 py-3 backdrop-blur">
        <h1 className="truncate text-base font-semibold md:text-lg">{judul}</h1>
        <span role="timer" aria-label="Sisa waktu" className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-sm font-semibold ${sisa <= 60 ? 'bg-red-100 text-red-700' : 'bg-brand-soft text-brand'}`}><Clock size={16} />{mmss(sisa)}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <section className="card p-5" aria-label={`Soal ${i + 1}`}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">Soal {i + 1} dari {soal.length}</span>
            {bab && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{bab.judul}</span>}
            {s.tingkat && <span className="rounded-full bg-teal-soft px-2.5 py-1 text-teal">{NAMA_TINGKAT[s.tingkat]}</span>}
          </div>
          <p data-testid="pertanyaan" className="mt-4 text-lg leading-relaxed">{rapikan(s.pertanyaan)}</p>
          <div className="mt-5">
            {s.tipe === 'pg' ? (
              <div role="radiogroup" aria-label="Pilihan jawaban" className="space-y-2">
                {s.pilihan.map((o, k) => (
                  <label key={o} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${jaw[s.id] === o ? 'border-brand bg-brand-soft' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name={`soal-${s.id}`} checked={jaw[s.id] === o} onChange={() => setJaw({ ...jaw, [s.id]: o })} className="sr-only" />
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold ring-1 ring-slate-300">{'ABCD'[k]}</span>
                    <span>{rapikan(o)}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <label htmlFor="isian" className="mb-1 block text-sm font-semibold">Jawabanmu</label>
                <input id="isian" aria-label="Jawaban" value={jaw[s.id] ?? ''} onChange={(e) => setJaw({ ...jaw, [s.id]: e.target.value })} className="input max-w-xs" inputMode="text" autoComplete="off" />
                <p className="mt-1 text-xs text-slate-500">Tulis angkanya saja. Pecahan boleh ditulis seperti 3/4, desimal boleh memakai koma.</p>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button onClick={() => setI(i - 1)} disabled={i === 0} className="btn btn-ghost"><ChevronLeft size={16} />Sebelumnya</button>
            <button onClick={() => setI(i + 1)} disabled={i === soal.length - 1} className="btn btn-ghost">Berikutnya<ChevronRight size={16} /></button>
            <button onClick={() => setRagu({ ...ragu, [s.id]: !ragu[s.id] })} aria-pressed={!!ragu[s.id]} className={`btn ${ragu[s.id] ? 'bg-sun text-white' : 'btn-ghost'}`}><Flag size={16} />{ragu[s.id] ? 'Ragu-ragu (ditandai)' : 'Tandai ragu-ragu'}</button>
          </div>
        </section>

        <aside className="card h-fit p-4" aria-label="Navigasi nomor soal">
          <p className="mb-2 text-sm font-semibold">Nomor soal</p>
          <div className="grid grid-cols-5 gap-2">
            {soal.map((x, k) => (
              <button key={x.id} onClick={() => setI(k)} aria-label={`Soal ${k + 1}${ragu[x.id] ? ', ragu-ragu' : terjawab(x) ? ', sudah dijawab' : ', belum dijawab'}`}
                className={`h-9 rounded-lg text-sm font-semibold ${k === i ? 'ring-2 ring-brand ring-offset-1' : ''} ${ragu[x.id] ? 'bg-sun text-white' : terjawab(x) ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'}`}>{k + 1}</button>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-xs text-slate-500">
            <p><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-brand" />Dijawab</p>
            <p><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-sun" />Ragu-ragu</p>
            <p><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-slate-200" />Belum dijawab</p>
          </div>
          <button onClick={() => setKonfirm(true)} className="btn btn-primary mt-4 w-full">Selesai dan kirim</button>
          <button onClick={onBatal} className="mt-2 w-full text-xs text-slate-500 underline hover:text-brand">Batalkan dan keluar</button>
        </aside>
      </div>

      {konfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label="Konfirmasi kirim jawaban">
          <div className="w-full max-w-sm rounded-xl2 bg-white p-6">
            <h2 className="text-lg font-semibold">Kirim jawaban sekarang?</h2>
            <p className="mt-2 text-sm text-slate-600">Belum dijawab: <b>{belum}</b>. Ditandai ragu-ragu: <b>{jmlRagu}</b>. Setelah dikirim, jawaban tidak bisa diubah.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setKonfirm(false)} className="btn btn-ghost">Kembali</button>
              <button onClick={() => kumpul(false)} className="btn btn-primary">Ya, kirim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function HasilUjian({ judul, hasil, aksi }) {
  const warna = hasil.skor >= 75 ? 'bg-teal text-white' : hasil.skor >= 50 ? 'bg-sun text-white' : 'bg-slate-600 text-white'
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className={`rounded-xl2 p-6 ${warna}`}>
        <p className="flex items-center gap-2 text-sm text-white/90"><Trophy size={16} />{judul}</p>
        <h1 className="mt-1 text-4xl font-bold">Skor {hasil.skor}</h1>
        <p className="mt-1 text-white/90">{hasil.benar} benar dari {hasil.total} soal · waktu {mmss(hasil.detik)}{hasil.waktuHabis ? ' (waktu habis)' : ''}</p>
      </div>
      <div className="flex flex-wrap gap-3">{aksi}</div>
      <section className="space-y-3" aria-label="Pembahasan">
        <h2 className="text-lg font-semibold">Pembahasan</h2>
        {hasil.items.map(({ soal: s, jawab, benar }, k) => (
          <details key={s.id} className="card p-4" open={!benar}>
            <summary className="flex cursor-pointer items-start gap-3">
              {benar ? <CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={20} /> : <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />}
              <span className="font-medium">{k + 1}. {rapikan(s.pertanyaan)}</span>
            </summary>
            <div className="mt-3 space-y-1 pl-8 text-sm">
              <p><span className="text-slate-500">Jawabanmu:</span> {jawab ? rapikan(jawab) : <i>tidak dijawab</i>}</p>
              <p><span className="text-slate-500">Kunci:</span> <b>{rapikan(Array.isArray(s.kunci) ? s.kunci[0] : s.kunci)}</b></p>
              <p className="rounded-lg bg-slate-50 p-3">{rapikan(s.pembahasan)}</p>
            </div>
          </details>
        ))}
      </section>
    </div>
  )
}
