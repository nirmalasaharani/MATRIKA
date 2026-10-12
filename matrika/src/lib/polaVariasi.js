// Kalimat otomatis "apa yang berubah dan apa yang tetap" (informasi saja, tidak dinilai).
const ALASAN = {
  'satu-persamaan': 'hanya ada satu persamaan untuk dua hal yang dicari, sehingga jawabannya tidak tunggal',
  'tidak-linear': 'ada persamaan yang tidak linear (variabel dikalikan atau berpangkat dua)',
  'satu-variabel': 'hanya ada satu variabel',
}
export function kalimatPola(lama, baru) {
  if (!lama) return 'Ini soal pertamamu, nanti kita lihat apa yang berubah di soal berikutnya.'
  const b = []
  if (lama.ciri.konteks !== baru.ciri.konteks) b.push('konteks')
  if (lama.ciri.representasi !== baru.ciri.representasi) b.push(`bentuk penyajian (${baru.ciri.representasi})`)
  if (lama.ciri.struktur !== baru.ciri.struktur) b.push('struktur soal')
  b.push('angka')
  const daftar = b.length > 1 ? `${b.slice(0, -1).join(', ')} dan ${b[b.length - 1]}` : b[0]
  const tetap = baru.konsep === 'SPLDV'
    ? 'tapi tetap SPLDV: dua hal yang dicari, dua persamaan, dan penyelesaian yang cocok untuk keduanya.'
    : `dan soal ini bukan SPLDV karena ${ALASAN[baru.alasan]}.`
  return `Soal ini beda ${daftar} dari soal tadi, ${tetap}`
}
