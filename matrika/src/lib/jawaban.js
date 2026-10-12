// Pemeriksaan jawaban untuk fitur umum (Bank Soal, Latihan Biasa, Try Out).
import { angka } from './penilaian.js'
import { parseEq } from './ekspresi.js'

// Mengubah "13,5", "3/10", "Rp70.000", "120 liter", "154 cm²" menjadi angka.
export function keAngka(s) {
  let t = String(s ?? '').toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-')
  t = t.replace(/(?<=\d)[a-z²³°]+(\/[a-z]+)?$/, '')
  const m = t.match(/^(-?\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)$/)
  if (m) { const a = parseFloat(m[1].replace(',', '.')), b = parseFloat(m[2].replace(',', '.')); return b ? a / b : NaN }
  return angka(t)
}
const norm = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-')

function setaraAljabar(a, b) {
  const eq = parseEq(`${a} = ${b}`)
  if (!eq.ok || eq.vars.length === 0 || eq.vars.length > 3) return false
  return [[1, 2, 3], [-2, 5, 0.5], [7, -3, 4], [0.3, 9, -6]].every((v) => {
    const env = {}; eq.vars.forEach((x, i) => { env[x] = v[i] })
    return Math.abs(eq.f(env)) < 1e-6
  })
}

export function samaIsian(input, kunci) {
  if (!String(input ?? '').trim()) return false
  for (const k of Array.isArray(kunci) ? kunci : [kunci]) {
    const a = keAngka(input), b = keAngka(k)
    if (Number.isFinite(a) && Number.isFinite(b)) { if (Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b))) return true; continue }
    if (norm(input) === norm(k) || setaraAljabar(input, k)) return true
  }
  return false
}

export const periksa = (soal, jawab) => (soal.tipe === 'pg' ? jawab === soal.kunci : samaIsian(jawab, soal.kunci))

export function acak(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
