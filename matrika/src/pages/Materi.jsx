import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Search, Check, ChevronLeft, ChevronRight, Shapes, ArrowRightLeft, TrendingUp, Scale, Triangle, CircleDot, Box, BarChart3, BookOpen, Play, ExternalLink, Dumbbell } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { babKelas, babById, materiBab } from '../lib/konten.js'
import { bacaSudahBaca, tandaiBaca, catatJejak } from '../lib/riwayat.js'
import Ilustrasi from '../components/Ilustrasi.jsx'

const IKON = { pola: Shapes, relasi: ArrowRightLeft, garis: TrendingUp, spldv: Scale, pythagoras: Triangle, lingkaran: CircleDot, bangun: Box, statistika: BarChart3 }
export const PilihKelas = ({ nilai, ubah }) => (
  <div role="tablist" aria-label="Pilih kelas" className="inline-flex rounded-xl bg-slate-100 p-1">
    {[7, 8, 9].map((k) => (
      <button key={k} role="tab" aria-selected={nilai === k} onClick={() => ubah(k)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${nilai === k ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}>Kelas {k}</button>
    ))}
  </div>
)

export function KosongKelas({ kelas, apa }) {
  return <div className="card p-8 text-center text-sm text-slate-600">{apa} untuk kelas {kelas} sedang disusun dan akan ditambahkan pada pembaruan berikutnya. Sementara itu, kamu bisa membuka kelas yang sudah tersedia.</div>
}

export function MateriDaftar() {
  const { user } = useAuth()
  const [kelas, setKelas] = useState(user.kelas || 8)
  const [q, setQ] = useState('')
  const baca = bacaSudahBaca(user.id)
  const semua = babKelas(kelas)
  const bab = semua.filter((b) => `${b.judul} ${b.ringkasan}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-6">
      <div><h1 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl"><BookOpen className="text-brand" />Materi</h1>
        <p className="mt-1 text-slate-600">Pilih kelas dan bab. Setiap bab punya materi bacaan dan video.</p></div>
      <div className="flex flex-wrap items-center gap-3">
        <PilihKelas nilai={kelas} ubah={(k) => { setKelas(k); setQ('') }} />
        <div className="relative grow sm:max-w-xs"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari bab..." aria-label="Cari bab" className="input pl-9" /></div>
      </div>
      {semua.length === 0 ? <KosongKelas kelas={kelas} apa="Materi" /> : bab.length === 0 ? <p className="text-sm text-slate-500">Tidak ada bab yang cocok dengan pencarianmu.</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bab.map((b, i) => { const Ikon = IKON[b.ikon] || BookOpen; const dibaca = baca.includes(b.id)
            return (
              <Link key={b.id} to={`/materi/${b.id}`} className="card block p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand"><Ikon size={22} /></span>
                  {dibaca && <span className="flex items-center gap-1 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-semibold text-teal"><Check size={12} />Sudah dibaca</span>}</div>
                <p className="mt-3 text-xs font-medium text-slate-500">Bab {semua.indexOf(b) + 1}</p>
                <h2 className="font-semibold">{b.judul}</h2>
                <p className="mt-1 text-sm text-slate-500">{b.ringkasan}</p>
              </Link>) })}
        </div>
      )}
    </div>
  )
}

const Blok = ({ b }) => {
  if (b.t === 'h') return <h2 className="mt-8 text-xl font-semibold">{b.v}</h2>
  if (b.t === 'p') return <p className="mt-2 leading-relaxed">{b.v}</p>
  if (b.t === 'ilustrasi') return <Ilustrasi jenis={b.jenis} ket={b.ket} />
  if (b.t === 'rumus') return <div className="my-4 rounded-xl2 border-l-4 border-brand bg-brand-soft p-4 font-serif text-lg" aria-label="Rumus">{b.v.map((l, i) => <p key={i} className={i === 0 || l.includes('=') ? 'font-semibold' : 'text-sm text-slate-600'}>{l}</p>)}</div>
  if (b.t === 'contoh') return (
    <div className="my-4 rounded-xl2 bg-white p-5 ring-1 ring-slate-200">
      <p className="text-xs font-semibold text-sun">Contoh soal</p>
      <p className="mt-1 font-medium">{b.soal}</p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">{b.langkah.map((l, i) => <li key={i}>{l}</li>)}</ol>
      <p className="mt-3 rounded-lg bg-teal-soft p-3 text-sm font-semibold text-teal">{b.jawaban}</p>
    </div>
  )
  return null
}

function Video({ id, judul }) {
  if (!id) return (
    <div className="card p-8 text-center">
      <Play className="mx-auto text-slate-400" />
      <p className="mt-3 font-semibold">Video bab ini belum ditautkan</p>
      <p className="mt-1 text-sm text-slate-600">Baca dulu materi pada tab Teks, atau cari video penjelasannya di YouTube.</p>
      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${judul} matematika SMP`)}`} target="_blank" rel="noreferrer" className="btn btn-primary mt-4">Cari video di YouTube <ExternalLink size={16} /></a>
    </div>
  )
  return (
    <div>
      <div className="aspect-video overflow-hidden rounded-xl2 bg-black ring-1 ring-slate-200">
        <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}`} title={`Video: ${judul}`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      </div>
      <p className="mt-2 text-sm text-slate-500">Video tidak bisa diputar? <a className="font-semibold text-brand hover:underline" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Buka di YouTube</a>.</p>
    </div>
  )
}

export function MateriDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const bab = babById(id), m = materiBab(id)
  const [tab, setTab] = useState('teks')
  useEffect(() => { if (bab && m) { tandaiBaca(user.id, id); catatJejak(user.id, { jenis: 'Materi', judul: bab.judul, ke: `/materi/${id}` }) } }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!bab || !m) return <Navigate to="/materi" replace />
  const saudara = babKelas(bab.kelas), idx = saudara.findIndex((b) => b.id === id)
  const sebelum = saudara[idx - 1], berikut = saudara[idx + 1]
  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/materi" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"><ChevronLeft size={16} />Semua materi</Link>
      <p className="mt-3 text-sm text-slate-500">Kelas {bab.kelas} · Bab {idx + 1}</p>
      <h1 className="text-2xl font-semibold md:text-3xl">{bab.judul}</h1>
      <div role="tablist" className="mt-4 inline-flex rounded-xl bg-slate-100 p-1">
        {[['teks', 'Teks'], ['video', 'Video']].map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-lg px-5 py-2 text-sm font-semibold ${tab === k ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}>{l}</button>)}
      </div>
      <div className="mt-6">
        {tab === 'video' ? <Video id={m.videoYoutubeId} judul={bab.judul} /> : (
          <article>
            <div className="rounded-xl2 bg-teal-soft p-4"><p className="text-sm font-semibold text-teal">Tujuan belajar</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">{m.tujuanBelajar.map((t) => <li key={t}>{t}</li>)}</ul></div>
            {m.teks.map((b, i) => <Blok key={i} b={b} />)}
            <div className="mt-8 rounded-xl2 bg-sun-soft p-5"><p className="font-semibold text-sun">Ringkasan</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{m.ringkasan.map((t) => <li key={t}>{t}</li>)}</ul></div>
          </article>
        )}
      </div>
      <div className="mt-8"><Link to={`/latihan/biasa?bab=${id}`} className="btn btn-primary"><Dumbbell size={16} />Latihan bab ini</Link></div>
      <div className="mt-6 flex justify-between gap-3 border-t border-slate-200 pt-4 text-sm">
        {sebelum ? <Link to={`/materi/${sebelum.id}`} className="flex items-center gap-1 font-semibold text-brand hover:underline"><ChevronLeft size={16} />{sebelum.judul}</Link> : <span />}
        {berikut ? <Link to={`/materi/${berikut.id}`} className="flex items-center gap-1 text-right font-semibold text-brand hover:underline">{berikut.judul}<ChevronRight size={16} /></Link> : <span />}
      </div>
    </div>
  )
}
