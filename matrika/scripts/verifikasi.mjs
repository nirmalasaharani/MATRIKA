// Jalankan: node scripts/verifikasi.mjs
import { SOAL_MISI, SOAL_BY_ID } from '../src/data/misi-spldv.js'
import { BLOK_MISI } from '../src/data/latihan-misi.js'
import { CONTOH_MATHGUIDE } from '../src/data/mathguide.js'
import { nilai } from '../src/lib/penilaian.js'
import { parseEq } from '../src/lib/ekspresi.js'
import { progresAwal, soalSekarang, kirimJawaban, ringkasan, blokTersedia } from '../src/lib/alur.js'
import { kalimatPola } from '../src/lib/polaVariasi.js'
import { bantuanBerjenjang } from '../src/lib/mathguide.js'

let galat = 0
const bad = (m) => { galat++; console.log('  GALAT:', m) }
const baris = []

// 1. Struktur
const ids = SOAL_MISI.map((s) => s.id)
if (new Set(ids).size !== ids.length) bad('id tidak unik')
if (SOAL_MISI.length !== 40) bad('jumlah soal ' + SOAL_MISI.length + ' (harus 40)')
const blok = BLOK_MISI[0]
const dipakai = blok.slots.flatMap((s) => [...s.pool, ...s.cadangan])
dipakai.forEach((id) => { if (!SOAL_BY_ID[id]) bad('pool menunjuk id tidak ada: ' + id) })
if (new Set(dipakai).size !== 40) bad('blok 1 harus memakai 40 soal unik (36 + 4 cadangan), dapat ' + new Set(dipakai).size)
blok.slots.forEach((s) => s.pool.forEach((id) => { if (SOAL_BY_ID[id].tingkat !== s.level) bad(`${id} tingkat ${SOAL_BY_ID[id].tingkat} != level slot ${s.level}`); if (SOAL_BY_ID[id].pola !== s.pola) bad(`${id} pola tidak cocok slot ${s.slot}`) }))
console.log('Blok 1 tersedia:', blokTersedia(blok), '| blok 2 tersedia:', blokTersedia(BLOK_MISI[1]))

// 2. Tiap soal: kunci lolos penilaian, jawaban salah ditolak, petunjuk tidak bocor
const fmt = (n) => [String(n), n >= 1000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : null].filter(Boolean)
for (const s of SOAL_MISI) {
  const k = s.kunci
  const jawaban = s.jawabTipe === 'dua-pasang' ? k.contohPasangan.map(String) : s.jawabTipe === 'nilai' ? k.nilai.map(String) : []
  const isian = { konsep: s.konsep, alasan: s.alasan || null, persamaan: k.persamaan, jawaban }
  const h = nilai(s, isian)
  const ok = h.benar
  if (!ok) bad(`${s.id}: kunci sendiri dinilai salah ${JSON.stringify(h)}`)
  // negatif: konsep salah, jawaban salah, persamaan setara (duplikat)
  const salahKonsep = nilai(s, { ...isian, konsep: s.konsep === 'SPLDV' ? 'bukan-SPLDV' : 'SPLDV', alasan: 'satu-variabel' })
  if (salahKonsep.benar) bad(`${s.id}: konsep salah tetap dinilai benar`)
  if (s.jawabTipe === 'nilai') {
    const salahJawab = nilai(s, { ...isian, jawaban: jawaban.map((x, i) => (i === 0 ? String(Number(x) + 1) : x)) })
    if (salahJawab.prosedur) bad(`${s.id}: jawaban salah lolos`)
    if (s.konsep === 'SPLDV') {
      const dup = nilai(s, { ...isian, persamaan: [k.persamaan[0], k.persamaan[0] + ' + 0'] })
      if (dup.pemodelan) bad(`${s.id}: dua persamaan setara lolos`)
      const satu = nilai(s, { ...isian, persamaan: [k.persamaan[0]] })
      if (satu.pemodelan) bad(`${s.id}: satu persamaan lolos`)
    }
  }
  // kebocoran: nilai jawaban (>=100) tidak boleh muncul di level1/level2
  const bocor = []
  const nilaiRahasia = [...(k.nilai || []), ...(k.var || [])].filter((n) => n >= 100)
  for (const n of nilaiRahasia) for (const f of fmt(n)) for (const lv of ['level1', 'level2']) if (new RegExp(`(?<![\\d.])${f.replace(/\./g, '\\.')}(?![\\d.])`).test(s.mg[lv])) bocor.push(`${lv}:${f}`)
  if (bocor.length) bad(`${s.id}: petunjuk membocorkan ${bocor.join(', ')}`)
  if (!CONTOH_MATHGUIDE[s.mg.level3]) bad(`${s.id}: level3 ${s.mg.level3} tidak ada`)
  if (!s.teks || !s.mg.level1 || !s.mg.level2 || !s.kunci.hasil) bad(`${s.id}: field kosong`)
  // grafik: titik harus terletak pada persamaan kunci
  if (s.tampilan?.tipe === 'grafik') s.tampilan.garis.forEach((g, i) => { const e = parseEq(k.persamaan[i]); g.titik.forEach(([x, y]) => { if (Math.abs(e.f({ x, y })) > 1e-9) bad(`${s.id}: titik (${x},${y}) tidak pada ${k.persamaan[i]}`) }) })
  baris.push([s.id, s.konsep, s.tingkat, ok ? 'kunci OK' : 'KUNCI SALAH', bocor.length ? 'BOCOR' : 'aman'])
}
const u3 = SOAL_BY_ID['U3-A'].tampilan.baris
if (u3.length !== 3) bad('U3-A harus 3 baris')
if (SOAL_BY_ID['T3-B'].tampilan.baris.length !== 2) bad('T3-B harus 2 baris')

// 2b. Variasi bentuk jawaban siswa
const t = SOAL_BY_ID['T1-A']
const coba = (nama, isian, harap) => { const h = nilai(t, { konsep: 'SPLDV', ...isian }); if (h.benar !== harap) bad(`${nama}: harap ${harap}, dapat ${h.benar} ${JSON.stringify(h.catatan)}`) }
coba('variabel x,y + format Rp', { persamaan: ['2x+3y=19.000', '3x + y = 18000'], jawaban: ['Rp5.000', '3000'] }, true)
coba('persamaan setara dibalik', { persamaan: ['19000 = 2b + 3p', '3b + p = 18000'], jawaban: ['5000', '3000'] }, true)
coba('persamaan salah angka', { persamaan: ['2b + 3p = 19000', '3b + p = 17000'], jawaban: ['5000', '3000'] }, false)
coba('tiga variabel', { persamaan: ['2b + 3p = 19000', '3b + z = 18000'], jawaban: ['5000', '3000'] }, false)
coba('teks bukan persamaan', { persamaan: ['harga buku', '3b + p = 18000'], jawaban: ['5000', '3000'] }, false)
const a = SOAL_BY_ID['T4-A']
if (!nilai(a, { konsep: 'SPLDV', persamaan: ['p + l = 24', 'p - l = 4'], jawaban: ['140 cm²'] }).benar) bad('T4-A bentuk p+l=24 ditolak')
const ub = SOAL_BY_ID['U4-B']
if (!nilai(ub, { konsep: 'SPLDV', persamaan: ['a + b = 11', '(10b + a) - (10a + b) = 27'], jawaban: ['47'] }).benar) bad('U4-B bentuk lain ditolak')
const u3a = SOAL_BY_ID['U3-A']
if (!nilai(u3a, { konsep: 'SPLDV', persamaan: ['4b+2m=98000', '3b+5m=140000', '7b+7m=238000'], jawaban: ['15000', '19000'] }).benar) bad('U3-A tiga persamaan ditolak')

// 3. Simulasi alur
let p = progresAwal(blok), n = 0, urutan = []
const benarSemua = (s) => { const k = s.kunci; return nilai(s, { konsep: s.konsep, alasan: s.alasan || null, persamaan: k.persamaan, jawaban: s.jawabTipe === 'dua-pasang' ? k.contohPasangan.map(String) : s.jawabTipe === 'nilai' ? k.nilai.map(String) : [] }) }
while (!p.selesai && n++ < 50) {
  const id = soalSekarang(p, blok); const s = SOAL_BY_ID[id]; urutan.push(id)
  p = kirimJawaban(p, blok, { soalId: id, isian: {}, hasil: benarSemua(s), bantuan: 0 }).progres
}
if (!p.selesai || urutan.length !== 12) bad('semua benar harus tuntas dalam 12 soal, dapat ' + urutan.length)
if (ringkasan(p)['lulus-langsung'] !== 12) bad('semua benar harus lulus langsung')

p = progresAwal(blok)
const salah = { konsep: false, pemodelan: false, prosedur: false, benar: false }
p = kirimJawaban(p, blok, { soalId: 'T1-A', isian: {}, hasil: benarSemua(SOAL_BY_ID['T1-A']) }).progres // slot1 benar
let r1 = kirimJawaban(p, blok, { soalId: 'T2-A', isian: {}, hasil: salah }); p = r1.progres
if (r1.keputusan.jenis !== 'ulang' || soalSekarang(p, blok) !== 'T2-B') bad('salah pertama harus memberi varian1 T2-B')
r1 = kirimJawaban(p, blok, { soalId: 'T2-B', isian: {}, hasil: salah }); p = r1.progres
if (soalSekarang(p, blok) !== 'T2-C') bad('salah kedua harus memberi varian2 T2-C')
r1 = kirimJawaban(p, blok, { soalId: 'T2-C', isian: {}, hasil: salah }); p = r1.progres
if (r1.keputusan.jenis !== 'dilewati' || p.slotSekarang !== 3) bad('salah 3x harus dilewati dan lanjut ke slot 3')
if (p.slot[2].status !== 'dilewati') bad('status slot 2 harus dilewati')
// benar setelah ulang
p = progresAwal(blok); p = kirimJawaban(p, blok, { soalId: 'T1-A', isian: {}, hasil: salah }).progres
p = kirimJawaban(p, blok, { soalId: 'T1-B', isian: {}, hasil: benarSemua(SOAL_BY_ID['T1-B']) }).progres
if (p.slot[1].status !== 'lulus-ulang') bad('benar setelah ulang harus lulus-ulang')
// level tutup
let q = progresAwal(blok), tutup = []
while (!q.selesai) { const id = soalSekarang(q, blok); const r = kirimJawaban(q, blok, { soalId: id, isian: {}, hasil: benarSemua(SOAL_BY_ID[id]) }); q = r.progres; if (r.keputusan.levelTutup) tutup.push(r.keputusan.levelTutup) }
if (tutup.join() !== 'mudah,sedang,hots') bad('level tutup salah: ' + tutup)

// 4. Kalimat pola & MathGuide
console.log('\nContoh kalimat pola:\n -', kalimatPola(null, SOAL_BY_ID['T1-A']), '\n -', kalimatPola(SOAL_BY_ID['T3-B'], SOAL_BY_ID['T3-C']), '\n -', kalimatPola(SOAL_BY_ID['T1-A'], SOAL_BY_ID['T2-C']))
const b = [0, 1, 2, 3, 4].map((i) => bantuanBerjenjang(SOAL_BY_ID['T1-A'], i))
if (b[0].level !== 1 || b[1].level !== 2 || b[2].level !== 3 || !b[2].contoh || !b[4].batas) bad('mesin MathGuide tidak sesuai')

console.log('\nRingkasan:')
console.log(baris.map((r) => r.join(' | ')).join('\n'))
console.log('\nTOTAL GALAT:', galat)
process.exit(galat ? 1 : 0)
