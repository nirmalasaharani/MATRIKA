// Penyimpanan progres Misi per siswa dan per blok (localStorage) + kuota harian bersama.
import { progresAwal } from './alur.js'
import { KONFIG } from '../data/konfigurasi.js'

const kunci = (uid, blokId) => `matrika_misi_${uid}_${blokId}`
const baca = (key, f) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : f } catch { return f } }
const tulis = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* penyimpanan penuh: abaikan */ } }

export function muatBlok(uid, blok) {
  const d = baca(kunci(uid, blok.id), null)
  if (d && d.progres) return d
  return { progres: progresAwal(blok), bantuan: {}, chat: {}, ditandai: [], terakhir: null }
}
export const simpanBlok = (uid, blokId, d) => tulis(kunci(uid, blokId), d)
export const resetBlok = (uid, blokId) => { try { localStorage.removeItem(kunci(uid, blokId)) } catch { /* abaikan */ } }

const hari = () => new Date().toLocaleDateString('sv')
export function kuota(uid) {
  const d = baca(`matrika_kuota_${uid}`, null)
  const terpakai = d && d.tanggal === hari() ? d.terpakai : 0
  return { terpakai, sisa: Math.max(0, KONFIG.kuotaHarianMisi - terpakai) }
}
export function pakaiKuota(uid) {
  tulis(`matrika_kuota_${uid}`, { tanggal: hari(), terpakai: kuota(uid).terpakai + 1 })
}
export const resetKuota = (uid) => { try { localStorage.removeItem(`matrika_kuota_${uid}`) } catch { /* abaikan */ } }

// Soal terakhir yang dikerjakan di blok ini (untuk kalimat "apa yang berubah")
export function soalTerakhirDikerjakan(progres) {
  let id = null, w = 0
  Object.values(progres.slot).forEach((s) => s.percobaan.forEach((p) => { if (p.waktu >= w) { w = p.waktu; id = p.soalId } }))
  return id
}
