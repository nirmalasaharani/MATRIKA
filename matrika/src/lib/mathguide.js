// Mesin MathGuide (simulasi berbasis aturan, tanpa AI sungguhan). Tidak pernah memberi jawaban akhir.
import { KONFIG } from '../data/konfigurasi.js'
import { CONTOH_MATHGUIDE, RUMUS, PESAN } from '../data/mathguide.js'

// n = jumlah bantuan berjenjang yang SUDAH diminta pada soal ini
export function bantuanBerjenjang(soal, n, konteks = {}) {
  if (n >= KONFIG.bantuanBerjenjangMaksPerSoal) return { batas: true, teks: PESAN.batas }
  const level = Math.min(3, n + 1)
  if (level === 1) {
    const teks = konteks.pemodelanBenar && soal.konsep === 'SPLDV' ? PESAN.modelBenar : soal.mg.level1
    return { level, teks }
  }
  if (level === 2) return { level, teks: soal.mg.level2 }
  return { level, teks: PESAN.contohPengantar, contoh: CONTOH_MATHGUIDE[soal.mg.level3] }
}

export function jawabRumus(topik) { return RUMUS[topik] || RUMUS.model }

// Memilah pesan bebas siswa: rumus / bantuan / luar konteks
export function tanggapiPesan(teks) {
  const t = teks.toLowerCase()
  if (/rumus|eliminasi|substitusi|grafik|model|cara/.test(t)) {
    const topik = /eliminasi/.test(t) ? 'eliminasi' : /substitusi/.test(t) ? 'substitusi' : /grafik/.test(t) ? 'grafik' : 'model'
    return { jenis: 'rumus', topik }
  }
  if (/petunjuk|bingung|bantu|tolong|susah|sulit|stuck|macet/.test(t)) return { jenis: 'bantuan' }
  return { jenis: 'luar', teks: PESAN.luarKonteks }
}
