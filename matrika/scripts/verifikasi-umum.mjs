// Jalankan: node scripts/verifikasi-umum.mjs
// Memeriksa struktur dan MENGHITUNG ULANG kunci jawaban Materi, Bank Soal, dan Try Out.
import { BAB } from '../src/data/bab.js'
import { MATERI } from '../src/data/materi-kelas8.js'
import { SOAL } from '../src/data/soal-kelas8.js'
import { TRYOUT } from '../src/data/tryout.js'
import { keAngka, samaIsian, periksa } from '../src/lib/jawaban.js'

let galat = 0
const bad = (m) => { galat++; console.log('  GALAT:', m) }
const hitung = (e) => Function(`"use strict"; return (${e})`)()
const dekat = (a, b) => Number.isFinite(a) && Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b))
const bab8 = BAB.filter((b) => b.kelas === 8)
let adaCek = 0, tanpaCek = []

// 1. Bab dan materi
if (bab8.length !== 8) bad('kelas 8 harus 8 bab, ada ' + bab8.length)
for (const b of bab8) {
  const m = MATERI.find((x) => x.babId === b.id)
  if (!m) { bad(`${b.id}: materi tidak ada`); continue }
  const j = (t) => m.teks.filter((x) => x.t === t)
  if (m.tujuanBelajar.length < 2) bad(`${b.id}: tujuan belajar kurang`)
  if (j('contoh').length < 2) bad(`${b.id}: contoh kurang dari 2`)
  if (j('ilustrasi').length < 1) bad(`${b.id}: ilustrasi tidak ada`)
  if (j('rumus').length < 1) bad(`${b.id}: rumus tidak ada`)
  if (m.ringkasan.length < 2) bad(`${b.id}: ringkasan kurang`)
  if (!('videoYoutubeId' in m)) bad(`${b.id}: field videoYoutubeId tidak ada`)
  for (const c of j('contoh')) {
    if (!c.soal || !c.langkah?.length || !c.jawaban) bad(`${b.id}: contoh tidak lengkap`)
    if (c.cek) {
      const v = hitung(c.cek)
      const angkaDiJawaban = (c.jawaban.match(/-?\d+(?:[.,]\d+)?(?:\/\d+)?/g) || []).map(keAngka)
      if (!angkaDiJawaban.some((a) => dekat(v, a))) bad(`${b.id}: cek contoh "${c.cek}" = ${v} tidak muncul di jawaban "${c.jawaban}"`)
    }
  }
}

// 2. Soal
const ids = SOAL.map((s) => s.id)
if (new Set(ids).size !== ids.length) bad('id soal tidak unik')
const teksSoal = [...SOAL.map((s) => s.pertanyaan), ...TRYOUT.flatMap((t) => t.soal.map((s) => s.pertanyaan))]
if (new Set(teksSoal).size !== teksSoal.length) bad('ada pertanyaan duplikat (bank soal / try out)')
const posisi = [0, 0, 0, 0]
for (const b of bab8) {
  const s = SOAL.filter((x) => x.babId === b.id)
  const pg = s.filter((x) => x.tipe === 'pg'), isi = s.filter((x) => x.tipe === 'isian')
  if (pg.length !== 6 || isi.length !== 4) bad(`${b.id}: harus 6 PG + 4 isian, ada ${pg.length} PG + ${isi.length} isian`)
  const t = (x) => s.filter((y) => y.tingkat === x).length
  console.log(`${b.id.padEnd(16)} PG ${pg.length} isian ${isi.length} | mudah ${t('mudah')} sedang ${t('sedang')} sulit ${t('sulit')}`)
}
for (const s of SOAL) {
  if (s.kelas !== 8 || !s.pertanyaan || !s.pembahasan || !s.kunci) bad(`${s.id}: field kosong`)
  if (!['mudah', 'sedang', 'sulit'].includes(s.tingkat)) bad(`${s.id}: tingkat salah`)
  if (!bab8.some((b) => b.id === s.babId)) bad(`${s.id}: babId tidak dikenal`)
  if (s.tipe === 'pg') {
    if (s.pilihan.length !== 4 || new Set(s.pilihan).size !== 4) bad(`${s.id}: PG harus 4 opsi unik`)
    const k = s.pilihan.indexOf(s.kunci)
    if (k < 0) bad(`${s.id}: kunci tidak ada di pilihan`)
    else posisi[k]++
    if (s.pilihan.filter((o) => periksa({ ...s, tipe: 'isian' }, o)).length > 1 && Number.isFinite(keAngka(s.kunci))) bad(`${s.id}: lebih dari satu opsi bernilai sama dengan kunci`)
  }
  if (s.cek !== undefined) {
    adaCek++
    const v = hitung(s.cek), k = keAngka(s.kunci)
    if (!dekat(v, k)) bad(`${s.id}: cek "${s.cek}" = ${v} tapi kunci "${s.kunci}" (${k})`)
  } else if (Number.isFinite(keAngka(s.kunci))) tanpaCek.push(s.id)
  // pemeriksa harus menerima kunci sendiri dan menolak jawaban salah
  if (!periksa(s, s.kunci)) bad(`${s.id}: kunci sendiri ditolak pemeriksa`)
  if (periksa(s, 'zzz-salah')) bad(`${s.id}: jawaban asal diterima`)
}

// 3. Try out
for (const t of TRYOUT) {
  if (t.soal.length !== 15) bad(`${t.id}: harus 15 soal, ada ${t.soal.length}`)
  if (t.durasiMenit !== 45) bad(`${t.id}: durasi`)
  t.soal.forEach((s, i) => {
    if (!s.pertanyaan || !s.kunci || !s.pembahasan) bad(`${t.id} no ${i + 1}: field kosong`)
    if (s.cek !== undefined) { adaCek++; const v = hitung(s.cek), k = keAngka(s.kunci); if (!dekat(v, k)) bad(`${t.id} no ${i + 1}: cek "${s.cek}" = ${v} tapi kunci "${s.kunci}"`) }
    else tanpaCek.push(`${t.id}#${i + 1}`)
    if (!samaIsian(s.kunci, s.kunci)) bad(`${t.id} no ${i + 1}: kunci ditolak`)
  })
}

// 4. Toleransi bentuk jawaban isian
const uji = (a, k, harap) => { if (samaIsian(a, k) !== harap) bad(`samaIsian("${a}", "${k}") harap ${harap}`) }
uji('23.000', '23000', true); uji('Rp23.000', '23000', true); uji('13,5', '13,5', true); uji('13.5', '13,5', true)
uji('0,3', '3/10', true); uji('3 / 10', '3/10', true); uji('-0,5', '-1/2', true); uji('120 liter', '120', true); uji('154 cm²', '154', true)
uji('8', '9', false); uji('', '8', false); uji('abc', '8', false); uji('1/3', '3/10', false)

console.log(`\nPG: posisi kunci A/B/C/D = ${posisi.join('/')} | soal dengan cek hitung: ${adaCek}`)
if (tanpaCek.length) console.log('Numerik tanpa cek (diperiksa manual):', tanpaCek.join(', '))
console.log('Total soal bank:', SOAL.length, '| try out:', TRYOUT.reduce((n, t) => n + t.soal.length, 0))
console.log('\nTOTAL GALAT:', galat)
process.exit(galat ? 1 : 0)
