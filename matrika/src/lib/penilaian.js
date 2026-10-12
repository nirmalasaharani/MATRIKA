// Penilaian rule-based (tanpa AI) untuk soal Misi. Tiga sinyal: konsep, pemodelan, prosedur.
// Sinyal keempat (bantuan MathGuide) dicatat oleh alur, bukan di sini.
import { parseEq, affine, linear, proporsional } from './ekspresi.js'

export function angka(s) {
  if (s === undefined || s === null) return NaN
  let t = String(s).toLowerCase().replace(/rp|km\/jam|derajat|keping|tahun|ekor|kg|cm²|cm2|cm|°|\s/g, '')
  t = t.replace(/(?<=\d)g$/, '')
  if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '')
  else t = t.replace(',', '.')
  return /^-?\d+(\.\d+)?$/.test(t) ? parseFloat(t) : NaN
}

const urutan = (v) => [[v[0], v[1]], [v[1], v[0]]]
const nol = (x) => Math.abs(x) < 1e-6

function nilaiModel(soal, daftar) {
  const teks = (daftar || []).map((s) => (s || '').trim()).filter(Boolean)
  if (!teks.length) return { ok: false, pesan: 'Belum ada persamaan yang ditulis.' }
  const eqs = teks.map(parseEq)
  const rusak = eqs.find((e) => !e.ok)
  if (rusak) return { ok: false, pesan: rusak.pesan }
  const vs = [...new Set(eqs.flatMap((e) => e.vars))]
  if (vs.length !== 2) return { ok: false, pesan: 'Modelmu harus memuat tepat dua variabel (dua besaran yang dicari).' }
  const k = soal.kunci

  if (soal.jawabTipe === 'dua-pasang') {
    const cocok = urutan(vs).some(([x, y]) => eqs.every((e) => proporsional(affine(e, x, y), k.model)))
    return cocok ? { ok: true } : { ok: false, pesan: 'Persamaanmu belum sesuai dengan informasi di soal.' }
  }
  if (soal.jawabTipe === 'pernyataan') {
    if (eqs.length < 2) return { ok: false, pesan: 'Tulis kedua informasi di soal sebagai dua persamaan.' }
    const ok = k.pasangan.some(([p, q]) => urutan(vs).some(([x, y]) => eqs.every((e) => nol(e.f({ [x]: p, [y]: q })))))
    return ok ? { ok: true } : { ok: false, pesan: 'Persamaanmu belum sesuai dengan informasi di soal.' }
  }
  if (eqs.length < 2) return { ok: false, pesan: 'Untuk SPLDV, tulis minimal dua persamaan.' }
  if (eqs.length > 3) return { ok: false, pesan: 'Cukup tulis persamaan yang diperlukan (maksimal 3).' }
  const v = k.var || k.nilai
  const urut = urutan(vs).find(([x, y]) => eqs.every((e) => nol(e.f({ [x]: v[0], [y]: v[1] }))))
  if (!urut) return { ok: false, pesan: 'Ada persamaan yang belum cocok dengan informasi di soal. Cek lagi tiap persamaan.' }
  if (!eqs.every((e) => linear(e, vs[0], vs[1]))) return { ok: false, pesan: 'Pada SPLDV semua persamaan harus linear.' }
  const af = eqs.map((e) => affine(e, vs[0], vs[1]))
  for (let i = 0; i < af.length; i++) for (let j = i + 1; j < af.length; j++)
    if (proporsional(af[i], af[j])) return { ok: false, pesan: 'Dua persamaanmu sebenarnya sama (setara). Cari informasi kedua di soal.' }
  return { ok: true }
}

function nilaiProsedur(soal, isian) {
  const j = isian.jawaban || []
  const k = soal.kunci
  if (soal.jawabTipe === 'pernyataan') {
    const ok = isian.konsep === 'bukan-SPLDV' && isian.alasan === soal.alasan
    return { ok, pesan: ok ? '' : 'Pernyataan dan alasanmu belum tepat.' }
  }
  const n = j.map(angka)
  if (soal.jawabTipe === 'dua-pasang') {
    if (n.length < 4 || n.slice(0, 4).some((x) => !Number.isFinite(x))) return { ok: false, pesan: 'Isi kedua pasangan nilai.' }
    const [a1, b1, a2, b2] = n
    if (a1 === a2 && b1 === b2) return { ok: false, pesan: 'Kedua pasangan harus berbeda.' }
    if (n.slice(0, 4).some((x) => x <= 0)) return { ok: false, pesan: 'Semua nilai harus positif.' }
    const m = k.model
    const ok = nol(m[0] * a1 + m[1] * b1 - m[2]) && nol(m[0] * a2 + m[1] * b2 - m[2])
    return { ok, pesan: ok ? '' : 'Salah satu pasangan belum memenuhi persamaan.' }
  }
  if (n.length < k.nilai.length || n.slice(0, k.nilai.length).some((x) => !Number.isFinite(x))) return { ok: false, pesan: 'Isi semua jawaban akhir.' }
  const ok = k.nilai.every((x, i) => nol(n[i] - x))
  return { ok, pesan: ok ? '' : 'Jawaban akhirmu belum sesuai. Coba cek ke kedua persamaan.' }
}

// isian = { konsep, alasan, persamaan: [string], jawaban: [string] }
export function nilai(soal, isian) {
  const konsep = isian.konsep === soal.konsep && (soal.konsep !== 'bukan-SPLDV' || isian.alasan === soal.alasan)
  const pem = nilaiModel(soal, isian.persamaan)
  const pro = nilaiProsedur(soal, isian)
  return {
    konsep, pemodelan: pem.ok, prosedur: pro.ok, benar: konsep && pem.ok && pro.ok,
    catatan: { konsep: konsep ? '' : 'Jenis masalah yang kamu pilih belum tepat. Baca lagi cirinya.', pemodelan: pem.pesan || '', prosedur: pro.pesan || '' },
  }
}
