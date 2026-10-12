import { useMemo, useState } from 'react'
import { Search, Bookmark, BookmarkCheck, CheckCircle2, XCircle, ChevronDown, Library } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { SEMUA_SOAL, babKelas, babById } from '../lib/konten.js'
import { periksa } from '../lib/jawaban.js'
import { rapikan, NAMA_TINGKAT } from '../lib/tampil.js'
import { bacaBank, simpanBank, catatJejak } from '../lib/riwayat.js'
import { PilihKelas, KosongKelas } from './Materi.jsx'

function Kartu({ s, nomor, stat, ubahStat }) {
  const [buka, setBuka] = useState(false)
  const [jawab, setJawab] = useState('')
  const [hasil, setHasil] = useState(null)
  const bab = babById(s.babId)
  const cek = () => { const b = periksa(s, jawab); setHasil(b); ubahStat(s.id, { status: b ? 'benar' : 'salah' }) }
  const ulang = () => { setHasil(null); setJawab('') }
  return (
    <li className="card p-4">
      <div className="flex items-start gap-3">
        <button onClick={() => setBuka(!buka)} aria-expanded={buka} className="flex grow items-start gap-3 text-left">
          <span className="mt-0.5 grid h-7 min-w-7 place-items-center rounded-full bg-brand-soft px-1 text-xs font-semibold text-brand">{nomor}</span>
          <span className="grow">
            <span className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{bab?.judul}</span>
              <span className="rounded-full bg-teal-soft px-2 py-0.5 text-teal">{NAMA_TINGKAT[s.tingkat]}</span>
              <span className="rounded-full bg-sun-soft px-2 py-0.5 text-sun">{s.tipe === 'pg' ? 'Pilihan ganda' : 'Isian'}</span>
              {stat?.status === 'benar' && <span className="flex items-center gap-1 text-teal"><CheckCircle2 size={14} />Benar</span>}
              {stat?.status === 'salah' && <span className="flex items-center gap-1 text-red-600"><XCircle size={14} />Salah</span>}
            </span>
            <span className="mt-1 block font-medium">{rapikan(s.pertanyaan)}</span>
          </span>
          <ChevronDown size={18} className={`mt-1 shrink-0 text-slate-400 ${buka ? 'rotate-180' : ''}`} />
        </button>
        <button onClick={() => ubahStat(s.id, { tandai: !stat?.tandai })} aria-label={stat?.tandai ? 'Hapus tanda soal' : 'Tandai soal'} aria-pressed={!!stat?.tandai} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-sun">
          {stat?.tandai ? <BookmarkCheck size={20} className="text-sun" /> : <Bookmark size={20} />}
        </button>
      </div>
      {buka && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          {s.tipe === 'pg' ? (
            <div role="radiogroup" className="space-y-2">
              {s.pilihan.map((o, k) => (
                <label key={o} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${hasil !== null && o === s.kunci ? 'border-teal bg-teal-soft' : hasil === false && jawab === o ? 'border-red-300 bg-red-50' : jawab === o ? 'border-brand bg-brand-soft' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name={`bank-${s.id}`} disabled={hasil !== null} checked={jawab === o} onChange={() => setJawab(o)} className="sr-only" />
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-semibold ring-1 ring-slate-300">{'ABCD'[k]}</span>{rapikan(o)}
                </label>
              ))}
            </div>
          ) : (
            <div><label htmlFor={`i-${s.id}`} className="mb-1 block text-sm font-semibold">Jawabanmu</label>
              <input id={`i-${s.id}`} value={jawab} disabled={hasil !== null} onChange={(e) => setJawab(e.target.value)} className="input max-w-xs" autoComplete="off" /></div>
          )}
          <div className="mt-4 flex gap-2">
            {hasil === null ? <button onClick={cek} disabled={!jawab.trim()} className="btn btn-primary">Cek jawaban</button> : <button onClick={ulang} className="btn btn-ghost">Coba lagi</button>}
          </div>
          {hasil !== null && (
            <div className={`mt-4 rounded-xl p-4 text-sm ${hasil ? 'bg-teal-soft' : 'bg-red-50'}`}>
              <p className="font-semibold">{hasil ? 'Jawabanmu benar!' : `Belum tepat. Kuncinya: ${rapikan(s.kunci)}`}</p>
              <p className="mt-1 text-slate-700">{rapikan(s.pembahasan)}</p>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export default function BankSoal() {
  const { user } = useAuth()
  const [kelas, setKelas] = useState(user.kelas || 8)
  const [f, setF] = useState({ bab: '', tingkat: '', tipe: '', status: '', q: '' })
  const [batas, setBatas] = useState(20)
  const [bank, setBank] = useState(() => bacaBank(user.id))
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setBatas(20) }
  const ubahStat = (id, patch) => { simpanBank(user.id, id, patch); setBank(bacaBank(user.id)) }
  const semuaKelas = useMemo(() => SEMUA_SOAL.filter((s) => s.kelas === kelas), [kelas])
  const daftar = useMemo(() => semuaKelas.filter((s) => {
    const st = bank[s.id]
    return (!f.bab || s.babId === f.bab) && (!f.tingkat || s.tingkat === f.tingkat) && (!f.tipe || s.tipe === f.tipe)
      && (!f.status || (f.status === 'belum' ? !st?.status : f.status === 'ditandai' ? st?.tandai : st?.status === f.status))
      && (!f.q || rapikan(s.pertanyaan).toLowerCase().includes(f.q.toLowerCase()))
  }), [semuaKelas, f, bank])
  return (
    <div className="space-y-6">
      <div><h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl"><Library className="text-brand" />Bank Soal</h1>
        <p className="mt-1 text-slate-600">Kumpulan soal dari semua bab. Pilih jenjang kelasmu, lalu kerjakan tanpa timer.</p></div>
      <PilihKelas nilai={kelas} ubah={(k) => { setKelas(k); setF({ bab: '', tingkat: '', tipe: '', status: '', q: '' }); setBatas(20) }} />
      {semuaKelas.length === 0 ? <KosongKelas kelas={kelas} apa="Soal" /> : (<>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={f.q} onChange={set('q')} placeholder="Cari soal..." aria-label="Cari soal" className="input pl-9" /></div>
          <select value={f.bab} onChange={set('bab')} aria-label="Filter bab" className="input"><option value="">Semua bab</option>{babKelas(kelas).map((b) => <option key={b.id} value={b.id}>{b.judul}</option>)}</select>
          <select value={f.tingkat} onChange={set('tingkat')} aria-label="Filter tingkat" className="input"><option value="">Semua tingkat</option><option value="mudah">Mudah</option><option value="sedang">Sedang</option><option value="sulit">Sulit</option></select>
          <select value={f.tipe} onChange={set('tipe')} aria-label="Filter tipe" className="input"><option value="">PG dan isian</option><option value="pg">Pilihan ganda</option><option value="isian">Isian</option></select>
          <select value={f.status} onChange={set('status')} aria-label="Filter status" className="input sm:col-span-2 lg:col-span-1"><option value="">Semua status</option><option value="belum">Belum dikerjakan</option><option value="benar">Sudah benar</option><option value="salah">Pernah salah</option><option value="ditandai">Ditandai</option></select>
        </div>
        <p className="text-sm text-slate-500" aria-live="polite">{daftar.length} soal ditemukan</p>
        {daftar.length === 0 ? <div className="card p-8 text-center text-sm text-slate-600">Tidak ada soal yang cocok dengan filtermu.</div> : (
          <ul className="space-y-3">{daftar.slice(0, batas).map((s, i) => <Kartu key={s.id} s={s} nomor={i + 1} stat={bank[s.id]} ubahStat={ubahStat} />)}</ul>)}
        {daftar.length > batas && <button onClick={() => setBatas(batas + 20)} className="btn btn-ghost mx-auto">Tampilkan lebih banyak</button>}
      </>)}
    </div>
  )
}
