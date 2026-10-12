// Mesin alur Latihan Misi (blok 12 slot, tanpa gembok). Fungsi murni, state mudah disimpan ke localStorage.
import { KONFIG } from '../data/konfigurasi.js'

export const NAMA_LEVEL = { mudah: 'Mudah', sedang: 'Sedang', hots: 'HOTS' }
export const NAMA_POLA = { utuh: 'Soal Utuh', kontras: 'Kontras', generalisasi: 'Generalisasi', fusi: 'Fusi' }

export const blokTersedia = (blok) =>
  blok.aktif !== false && blok.slots.length === 12 && blok.slots.every((s) => s.pool.length > 0 && s.pool.every(Boolean))

export function progresAwal(blok) {
  return {
    blokId: blok.id, slotSekarang: 1, selesai: false,
    slot: Object.fromEntries(blok.slots.map((s) => [s.slot, { status: s.slot === 1 ? 'sekarang' : 'belum', percobaan: [] }])),
  }
}

const kandidat = (blok, nomor, progres) => {
  const s = blok.slots[nomor - 1]
  const dipakai = progres.slot[nomor].percobaan.map((p) => p.soalId)
  return [...s.pool, ...(s.cadangan || [])].filter((id) => id && !dipakai.includes(id))
}

// Soal yang harus dikerjakan sekarang (null jika blok selesai). Tidak pernah mengulang soal dalam satu slot.
export function soalSekarang(progres, blok) {
  if (progres.selesai) return null
  return kandidat(blok, progres.slotSekarang, progres)[0] ?? null
}

export const percobaanKe = (progres) => progres.slot[progres.slotSekarang].percobaan.length + 1

// hasil = keluaran nilai(); bantuan = jumlah bantuan berjenjang pada soal ini
export function kirimJawaban(progres, blok, { soalId, isian, hasil, bantuan = 0, foto = null }) {
  const p = JSON.parse(JSON.stringify(progres))
  const s = blok.slots[p.slotSekarang - 1]
  const st = p.slot[s.slot]
  const ke = st.percobaan.length + 1
  st.percobaan.push({
    soalId, isian, benar: hasil.benar, foto, waktu: Date.now(),
    sinyal: { konsep: hasil.konsep, pemodelan: hasil.pemodelan, prosedur: hasil.prosedur, bantuan },
  })
  let jenis
  if (hasil.benar) { st.status = ke === 1 ? 'lulus-langsung' : 'lulus-ulang'; jenis = 'lanjut' }
  else if (ke > KONFIG.maxUlang || kandidat(blok, s.slot, p).length === 0) { st.status = 'dilewati'; jenis = 'dilewati' }
  else jenis = 'ulang'

  const keputusan = { jenis, slot: s.slot, percobaanKe: ke, maksPercobaan: KONFIG.maxUlang + 1 }
  if (jenis !== 'ulang') {
    if (s.slot === 12) { p.selesai = true; keputusan.tuntas = true }
    else { p.slotSekarang = s.slot + 1; p.slot[p.slotSekarang].status = 'sekarang'; keputusan.slotBerikutnya = p.slotSekarang }
    if (s.slot % 4 === 0) keputusan.levelTutup = s.level
  }
  return { progres: p, keputusan }
}

export function ringkasan(progres) {
  const r = { 'lulus-langsung': 0, 'lulus-ulang': 0, dilewati: 0, selesai: 0 }
  Object.values(progres.slot).forEach((s) => { if (r[s.status] !== undefined) { r[s.status]++; r.selesai++ } })
  return r
}
