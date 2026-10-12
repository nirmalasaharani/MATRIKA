import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { MessageCircleQuestion, Camera, Sparkles, Plus, X, ChevronDown, Flag, Send, Loader2, ImageIcon } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { BLOK_MISI } from '../data/latihan-misi.js'
import { SOAL_BY_ID } from '../data/misi-spldv.js'
import { RUMUS } from '../data/mathguide.js'
import { KONFIG } from '../data/konfigurasi.js'
import { blokTersedia, soalSekarang, kirimJawaban, NAMA_LEVEL, NAMA_POLA } from '../lib/alur.js'
import { nilai } from '../lib/penilaian.js'
import { bantuanBerjenjang, jawabRumus, tanggapiPesan } from '../lib/mathguide.js'
import { muatBlok, simpanBlok, kuota, pakaiKuota, soalTerakhirDikerjakan } from '../lib/progresMisi.js'
import TampilanSoal from '../components/Tampilan.jsx'

const JENIS = [['', 'Pilih jenis masalah...'], ['SPLDV', 'SPLDV (sistem persamaan linear dua variabel)'], ['bukan-SPLDV', 'Bukan SPLDV'], ['PLSV', 'Persamaan linear satu variabel'], ['lainnya', 'Lainnya']]
const ALASAN = [['', 'Pilih alasan...'], ['satu-persamaan', 'Hanya satu persamaan'], ['tidak-linear', 'Ada persamaan yang tidak linear'], ['satu-variabel', 'Hanya satu variabel']]
const METODE = [['', 'Pilih metode (opsional)...'], ['eliminasi', 'Eliminasi'], ['substitusi', 'Substitusi'], ['grafik', 'Grafik'], ['lainnya', 'Lainnya']]
const AWAL_LEVEL = [1, 5, 9]

function TandaFoto({ aktif, onKonfirm }) {
  if (!aktif) return null
  return (
    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-sun">
      <Camera size={14} />Terisi dari foto, periksa dulu
      <button type="button" onClick={onKonfirm} className="rounded-full bg-sun-soft px-2 py-0.5 font-semibold hover:bg-sun hover:text-white">Sudah benar</button>
    </p>
  )
}

function PanelMathGuide({ buka, tutup, pesan, n, onMinta, onRumus, onKirim, onTandai }) {
  const [teks, setTeks] = useState('')
  const akhir = useRef(null)
  useEffect(() => { if (buka) akhir.current?.scrollIntoView?.({ block: "end" }) }, [pesan, buka])
  if (!buka) return null
  const kirim = (e) => { e.preventDefault(); if (!teks.trim()) return; onKirim(teks.trim()); setTeks('') }
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={tutup} />
      <aside role="dialog" aria-label="MathGuide" className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-2xl lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[26rem] lg:rounded-none">
        <header className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <h2 className="flex items-center gap-2 font-semibold"><MessageCircleQuestion size={18} className="text-brand" />MathGuide</h2>
            <p className="text-xs text-slate-500">Bantuan terpakai di soal ini: {n}/{KONFIG.bantuanBerjenjangMaksPerSoal}</p>
          </div>
          <button onClick={tutup} aria-label="Tutup MathGuide" className="rounded-full p-2 hover:bg-slate-100"><X size={18} /></button>
        </header>
        <div className="grow space-y-3 overflow-y-auto p-4">
          {pesan.length === 0 && <p className="rounded-xl bg-brand-soft p-3 text-sm">Halo! Aku MathGuide. Aku tidak akan memberi jawaban akhir, tapi aku akan memandumu lewat pertanyaan dan petunjuk. Pilih tombol di bawah atau tulis pertanyaanmu.</p>}
          {pesan.map((m, i) => m.dari === 'siswa' ? (
            <div key={i} className="ml-8 rounded-xl bg-brand p-3 text-sm text-white">{m.teks}</div>
          ) : (
            <div key={i} className="mr-8 rounded-xl bg-slate-100 p-3 text-sm">
              {m.level && <p className="mb-1 text-xs font-semibold text-brand">{m.auto ? 'Pertanyaan pemandu untuk percobaan ini' : ['', 'Level 1: pertanyaan pemandu', 'Level 2: petunjuk', 'Level 3: contoh langkah'][m.level]}</p>}
              {m.rumus && <p className="mb-1 font-semibold">{m.rumus.judul}</p>}
              <p>{m.teks || m.rumus?.isi}</p>
              {m.contoh && (<div className="mt-2 rounded-lg bg-white p-3"><p className="mb-1 font-semibold">{m.contoh.judul}</p>
                <ol className="list-decimal space-y-1 pl-5">{m.contoh.langkah.map((l, j) => <li key={j}>{l}</li>)}</ol></div>)}
              <button onClick={() => onTandai(i)} disabled={m.ditandai} className="mt-2 flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 disabled:text-red-600"><Flag size={12} />{m.ditandai ? 'Ditandai untuk ditinjau guru' : 'Tandai jawaban ini tidak sesuai'}</button>
            </div>
          ))}
          <div ref={akhir} />
        </div>
        <div className="border-t border-slate-200 p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            <button onClick={() => onMinta()} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand hover:text-white">Beri petunjuk</button>
            <button onClick={() => onMinta('Aku bingung di langkah ini')} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand hover:text-white">Aku bingung di langkah ini</button>
            <button onClick={onRumus} className="rounded-full bg-teal-soft px-3 py-1.5 text-xs font-semibold text-teal hover:bg-teal hover:text-white">Rumus apa yang kupakai?</button>
          </div>
          <form onSubmit={kirim} className="flex gap-2">
            <input value={teks} onChange={(e) => setTeks(e.target.value)} className="input" placeholder="Tulis pertanyaanmu..." aria-label="Pertanyaan untuk MathGuide" />
            <button className="btn btn-primary px-3" aria-label="Kirim"><Send size={16} /></button>
          </form>
        </div>
      </aside>
    </>
  )
}

function Pengerjaan({ blok, soal, data, ubah, user, pindah }) {
  const nav = useNavigate()
  const slot = blok.slots[data.progres.slotSekarang - 1]
  const percobaan = data.progres.slot[slot.slot].percobaan.length + 1
  const n = data.bantuan[soal.id] || 0
  const pesan = data.chat[soal.id] || []
  const awalTerbuka = percobaan > 1 || AWAL_LEVEL.includes(slot.slot)

  const [konsep, setKonsep] = useState('')
  const [alasan, setAlasan] = useState('')
  const [pers, setPers] = useState([''])
  const [jaw, setJaw] = useState(() => soal.jawab.map(() => ''))
  const [rin, setRin] = useState({ diketahui: '', ditanyakan: '', rumus: '', metode: '', langkah: '', cek1: false, cek2: false, kesimpulan: '' })
  const [bukaRin, setBukaRin] = useState(awalTerbuka)
  const [foto, setFoto] = useState(null)
  const [membaca, setMembaca] = useState(false)
  const [terisiAwal, setTerisiAwal] = useState([])
  const [dariFoto, setDariFoto] = useState([])
  const [diedit, setDiedit] = useState([])
  const [konfirm, setKonfirm] = useState([])
  const [mgBuka, setMgBuka] = useState(false)
  const [tab, setTab] = useState('soal')
  const anjuran = awalTerbuka || n > 0

  useEffect(() => { if (n > 0) setBukaRin(true) }, [n])
  useEffect(() => {
    if (percobaan > 1) ubah((d) => (d.chat[soal.id]?.length ? d : { ...d, chat: { ...d.chat, [soal.id]: [{ dari: 'bot', auto: true, level: 1, teks: soal.mg.level1 }] } }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const edit = (f) => { if (dariFoto.includes(f)) { setDariFoto((x) => x.filter((y) => y !== f)); setDiedit((x) => [...x, f]) } }
  const ubahRin = (k, v) => { setRin((r) => ({ ...r, [k]: v })); edit(k) }
  const ubahPers = (i, v) => { setPers((p) => p.map((x, j) => (j === i ? v : x))); edit('persamaan') }
  const konfirmasi = (f) => { setDariFoto((x) => x.filter((y) => y !== f)); setKonfirm((x) => [...x, f]) }

  const pilihFoto = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const rd = new FileReader()
    rd.onload = () => {
      const img = new Image()
      img.onload = () => {
        const s = Math.min(1, 640 / img.width), c = document.createElement('canvas')
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s)
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
        setFoto({ nama: f.name, dataUrl: c.toDataURL('image/jpeg', 0.6) })
      }
      img.src = rd.result
    }
    rd.readAsDataURL(f)
  }
  // SIMULASI: tanpa OCR/AI. Mengisi dari data hasilBacaFoto soal ini; kolom kosong di data tetap kosong.
  const bacaFoto = () => {
    setMembaca(true)
    setTimeout(() => {
      const f = soal.foto, t = []
      const r = {}
      ;['diketahui', 'ditanyakan', 'rumus'].forEach((k) => { if (f[k]) { r[k] = f[k]; t.push(k) } })
      setRin((x) => ({ ...x, ...r }))
      if (f.persamaan) { setPers(f.persamaan.split(';').map((s) => s.trim()).filter(Boolean).slice(0, 3)); t.push('persamaan') }
      if (t.some((k) => k !== 'persamaan')) setBukaRin(true)
      setTerisiAwal(t); setDariFoto(t); setDiedit([]); setKonfirm([]); setMembaca(false)
    }, 1300)
  }

  const tambah = (msgs, hitung) => ubah((d) => ({
    ...d,
    bantuan: hitung ? { ...d.bantuan, [soal.id]: (d.bantuan[soal.id] || 0) + 1 } : d.bantuan,
    chat: { ...d.chat, [soal.id]: [...(d.chat[soal.id] || []), ...msgs] },
  }))
  const minta = (teksSiswa) => {
    const pm = nilai(soal, { konsep, alasan, persamaan: pers, jawaban: [] }).pemodelan
    const r = bantuanBerjenjang(soal, n, { pemodelanBenar: pm })
    const msgs = teksSiswa ? [{ dari: 'siswa', teks: teksSiswa }] : []
    msgs.push({ dari: 'bot', teks: r.teks, level: r.level, contoh: r.contoh })
    tambah(msgs, !r.batas)
  }
  const rumus = (teksSiswa, topik = 'model') => {
    const msgs = [{ dari: 'siswa', teks: teksSiswa || 'Rumus apa yang kupakai?' }]
    msgs.push({ dari: 'bot', rumus: jawabRumus(topik), teks: topik === 'model' ? 'Tanya "eliminasi", "substitusi", atau "grafik" kalau kamu mau rumus metodenya.' : undefined })
    tambah(msgs, false)
  }
  const kirimPesan = (t) => {
    const r = tanggapiPesan(t)
    if (r.jenis === 'rumus') rumus(t, r.topik)
    else if (r.jenis === 'bantuan') minta(t)
    else tambah([{ dari: 'siswa', teks: t }, { dari: 'bot', teks: r.teks }], false)
  }
  const tandai = (i) => ubah((d) => ({
    ...d,
    ditandai: [...d.ditandai, { soalId: soal.id, indeks: i, waktu: Date.now() }],
    chat: { ...d.chat, [soal.id]: d.chat[soal.id].map((m, j) => (j === i ? { ...m, ditandai: true } : m)) },
  }))

  const siap = konsep && (konsep !== 'bukan-SPLDV' || alasan) && pers.some((s) => s.trim()) && jaw.every((x) => x.trim())
  const kirim = () => {
    const isian = { konsep, alasan: konsep === 'bukan-SPLDV' ? alasan : null, persamaan: pers.filter((s) => s.trim()), jawaban: jaw }
    const hasil = nilai(soal, isian)
    const fotoCatatan = foto ? { nama: foto.nama, dataUrl: foto.dataUrl, terisiDariFoto: terisiAwal, diedit, dikonfirmasi: konfirm, belumDiperiksa: dariFoto } : null
    const idSebelumnya = soalTerakhirDikerjakan(data.progres)
    const { progres, keputusan } = kirimJawaban(data.progres, blok, { soalId: soal.id, isian: { ...isian, rincian: rin }, hasil, bantuan: n, foto: fotoCatatan })
    pakaiKuota(user.id)
    pindah()
    ubah((d) => ({ ...d, progres, terakhir: { soalId: soal.id, hasil, keputusan, idSebelumnya, bantuan: n } }))
    nav(`/misi/${blok.id}/hasil`)
  }

  const Lbl = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="mb-1 block text-sm font-semibold">{children}</label>
  const sisaKuota = kuota(user.id).sisa

  return (
    <div className="pb-24 lg:pb-0">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <Link to={`/misi/${blok.id}`} className="text-brand hover:underline">{blok.judul}</Link>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">Soal {slot.slot} dari 12</span>
        <span className="rounded-full bg-teal-soft px-2.5 py-1 text-teal">Level {NAMA_LEVEL[slot.level]}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{NAMA_POLA[slot.pola]}</span>
        <span className="rounded-full bg-sun-soft px-2.5 py-1 text-sun">Percobaan {percobaan} dari {KONFIG.maxUlang + 1}</span>
        <span className="ml-auto text-slate-500">Sisa kuota: {sisaKuota}</span>
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-xl bg-slate-100 p-1 lg:hidden" role="tablist">
        {[['soal', 'Soal'], ['jawab', 'Jawabanmu']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-lg py-2 text-sm font-semibold ${tab === k ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}>{l}</button>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section className={`card p-5 lg:sticky lg:top-20 ${tab === 'soal' ? '' : 'hidden lg:block'}`} aria-label="Soal">
          <h1 className="text-xl font-semibold">{soal.judul}</h1>
          <p className="mt-3 leading-relaxed">{soal.teks}</p>
          <TampilanSoal t={soal.tampilan} />
          {soal.jawabTipe === 'pernyataan' && <p className="mt-4 rounded-xl bg-brand-soft p-3 text-sm">Jawabanmu berupa pilihan jenis masalah dan alasannya. Tulis juga informasi di soal sebagai persamaan.</p>}
        </section>

        <section className={`space-y-5 ${tab === 'jawab' ? '' : 'hidden lg:block'}`} aria-label="Strategy Builder">
          <div className="card space-y-5 p-5">
            <div>
              <h2 className="text-lg font-semibold">Strategy Builder</h2>
              <p className="text-sm text-slate-500">Isi tiga bagian ini. Rincian lain bersifat opsional.</p>
            </div>

            <div>
              <Lbl htmlFor="jenis">1. Jenis masalah / konsep</Lbl>
              <select id="jenis" className="input" value={konsep} onChange={(e) => setKonsep(e.target.value)}>{JENIS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
              {konsep === 'bukan-SPLDV' && (
                <div className="mt-3">
                  <Lbl htmlFor="alasan">Alasannya</Lbl>
                  <select id="alasan" className="input" value={alasan} onChange={(e) => setAlasan(e.target.value)}>{ALASAN.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                </div>
              )}
            </div>

            <div>
              <Lbl>2. Model matematika / persamaan</Lbl>
              <div className="space-y-2">
                {pers.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={p} onChange={(e) => ubahPers(i, e.target.value)} className="input" placeholder="Tulis persamaan, mis. x + y = 10" aria-label={`Persamaan ${i + 1}`} />
                    {i > 0 && <button type="button" onClick={() => setPers((x) => x.filter((_, j) => j !== i))} aria-label="Hapus persamaan" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button>}
                  </div>
                ))}
              </div>
              <TandaFoto aktif={dariFoto.includes('persamaan')} onKonfirm={() => konfirmasi('persamaan')} />
              {pers.length < 3 && <button type="button" onClick={() => setPers((x) => [...x, ''])} className="mt-2 flex items-center gap-1 text-sm font-semibold text-brand hover:underline"><Plus size={16} />Tambah persamaan</button>}
            </div>

            <div>
              <Lbl>3. Jawaban akhir</Lbl>
              {soal.jawab.length === 0 ? <p className="text-sm text-slate-500">Tidak ada angka yang perlu diisi. Jawabanmu adalah pilihan jenis masalah dan alasan di atas.</p> : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {soal.jawab.map((j, i) => (
                    <div key={i}>
                      <label htmlFor={`j${i}`} className="mb-1 block text-xs text-slate-600">{j.label}</label>
                      <div className="flex items-center gap-2">
                        {j.satuan === 'Rp' && <span className="text-sm text-slate-500">Rp</span>}
                        <input id={`j${i}`} value={jaw[i]} inputMode="decimal" onChange={(e) => setJaw((x) => x.map((y, k) => (k === i ? e.target.value : y)))} className="input" />
                        {j.satuan && j.satuan !== 'Rp' && <span className="shrink-0 text-sm text-slate-500">{j.satuan}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card p-5">
            <button type="button" onClick={() => setBukaRin(!bukaRin)} aria-expanded={bukaRin} className="flex w-full items-center justify-between text-left">
              <span className="flex items-center gap-2 font-semibold">Tambah rincian {anjuran && <span className="rounded-full bg-sun px-2 py-0.5 text-[11px] font-semibold text-white">Dianjurkan</span>}</span>
              <ChevronDown className={bukaRin ? 'rotate-180' : ''} size={18} />
            </button>
            {bukaRin && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-slate-500">Bagian ini tidak ikut dinilai, tapi tersimpan dan bisa dilihat gurumu.</p>
                {[['diketahui', 'Apa yang diketahui?'], ['ditanyakan', 'Apa yang ditanyakan?'], ['rumus', 'Rumus yang digunakan']].map(([k, l]) => (
                  <div key={k}>
                    <Lbl htmlFor={k}>{l}</Lbl>
                    <input id={k} className="input" value={rin[k]} onChange={(e) => ubahRin(k, e.target.value)} />
                    <TandaFoto aktif={dariFoto.includes(k)} onKonfirm={() => konfirmasi(k)} />
                  </div>
                ))}
                <div><Lbl htmlFor="metode">Metode</Lbl>
                  <select id="metode" className="input" value={rin.metode} onChange={(e) => ubahRin('metode', e.target.value)}>{METODE.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
                <div><Lbl htmlFor="langkah">Langkah penyelesaian</Lbl>
                  <textarea id="langkah" rows={4} className="input" value={rin.langkah} onChange={(e) => ubahRin('langkah', e.target.value)} placeholder="Tulis langkahmu satu per satu" /></div>
                <fieldset>
                  <legend className="mb-1 text-sm font-semibold">Periksa kembali</legend>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={rin.cek1} onChange={(e) => ubahRin('cek1', e.target.checked)} />Sudah kucek ke persamaanku</label>
                  <label className="mt-1 flex items-center gap-2 text-sm"><input type="checkbox" checked={rin.cek2} onChange={(e) => ubahRin('cek2', e.target.checked)} />Jawabanku masuk akal</label>
                  <input className="input mt-2" placeholder="Kesimpulanmu" aria-label="Kesimpulan" value={rin.kesimpulan} onChange={(e) => ubahRin('kesimpulan', e.target.value)} />
                </fieldset>
              </div>
            )}
          </div>

          <div className="card p-5">
            <h3 className="flex items-center gap-2 font-semibold"><Camera size={18} className="text-brand" />Foto langkah (opsional)</h3>
            <p className="mt-1 text-xs text-slate-500">Menulis di kertas? Foto langkahmu, lalu MATRIKA membantu mengisi kolom. Kamu tetap memeriksanya. Foto tidak dinilai dan hanya dilihat gurumu.</p>
            <label className="btn btn-ghost mt-3 cursor-pointer"><ImageIcon size={16} />{foto ? 'Ganti foto' : 'Unggah foto'}<input type="file" accept="image/*" capture="environment" onChange={pilihFoto} className="sr-only" /></label>
            {foto && (
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <img src={foto.dataUrl} alt="Pratinjau foto langkah pengerjaan" className="h-28 rounded-xl ring-1 ring-slate-200" />
                <button type="button" onClick={bacaFoto} disabled={membaca} className="btn btn-primary">{membaca ? <><Loader2 size={16} className="animate-spin" />Membaca foto...</> : <><Sparkles size={16} />Bantu isi dari foto</>}</button>
              </div>
            )}
          </div>

          <button onClick={kirim} disabled={!siap} className="btn btn-primary w-full py-3 text-base">Kirim jawaban</button>
          {!siap && <p className="-mt-3 text-center text-xs text-slate-500">Lengkapi ketiga bagian di atas untuk mengirim.</p>}
        </section>
      </div>

      <button onClick={() => setMgBuka(true)} className="fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-teal px-4 py-3 text-sm font-semibold text-white shadow-lg lg:bottom-6">
        <MessageCircleQuestion size={18} />Tanya MathGuide
      </button>
      <PanelMathGuide buka={mgBuka} tutup={() => setMgBuka(false)} pesan={pesan} n={n} onMinta={minta} onRumus={() => rumus()} onKirim={kirimPesan} onTandai={tandai} />
    </div>
  )
}

export default function MisiSoal() {
  const { blokId } = useParams()
  const { user } = useAuth()
  const blok = BLOK_MISI.find((b) => b.id === Number(blokId))
  const [data, setData] = useState(() => (blok ? muatBlok(user.id, blok) : null))
  const [pergi, setPergi] = useState(false)
  const ref = useRef(data)
  // Simpan seketika (sinkron) supaya data tidak hilang saat halaman langsung berpindah ke hasil.
  const ubah = useCallback((fn) => { const x = fn(ref.current); ref.current = x; simpanBlok(user.id, blok.id, x); setData(x) }, [user.id, blok?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (pergi) return null
  if (!blok || !blokTersedia(blok)) return <Navigate to="/misi" replace />
  if (data.progres.selesai) return <Navigate to={`/misi/${blok.id}`} replace />
  if (kuota(user.id).sisa <= 0) return (
    <div className="card mx-auto max-w-lg p-8 text-center">
      <h1 className="text-xl font-semibold">Kuota Misi hari ini sudah habis</h1>
      <p className="mt-2 text-sm text-slate-600">Progresmu tersimpan. Lanjutkan besok, atau lihat paket untuk kuota tambahan.</p>
      <div className="mt-5 flex justify-center gap-3"><Link to={`/misi/${blok.id}`} className="btn btn-ghost">Kembali ke jalur</Link><Link to="/paket" className="btn btn-primary">Lihat paket</Link></div>
    </div>
  )
  const soalId = soalSekarang(data.progres, blok)
  const soal = soalId && SOAL_BY_ID[soalId]
  if (!soal) return <Navigate to={`/misi/${blok.id}`} replace />
  return <Pengerjaan key={soalId} blok={blok} soal={soal} data={data} ubah={ubah} user={user} pindah={() => setPergi(true)} />
}
