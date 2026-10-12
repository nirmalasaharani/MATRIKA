// Susunan blok Latihan Misi. Tiap blok = 12 slot (3 level x 4 pola). Tiap slot punya pool [utama, varian1, varian2].
const POLA = ['utuh', 'kontras', 'generalisasi', 'fusi']
const LEVEL = ['mudah', 'sedang', 'hots']
const susun = (pools = [], cadangan = {}) =>
  Array.from({ length: 12 }, (_, i) => ({
    slot: i + 1, level: LEVEL[Math.floor(i / 4)], pola: POLA[i % 4],
    pool: pools[i] || [], cadangan: cadangan[i + 1] || [],
  }))

const POOL_BLOK1 = [
  ['T1-A', 'T1-B', 'T1-C'], ['T2-A', 'T2-B', 'T2-C'], ['T3-B', 'T3-C', 'T3-D'], ['T4-A', 'T4-B', 'T4-C'],
  ['S1-A', 'S1-B', 'S1-C'], ['S2-A', 'S2-B', 'S2-C'], ['S3-A', 'S3-B', 'S3-C'], ['S4-A', 'S4-B', 'S4-C'],
  ['U1-A', 'U1-B', 'U1-C'], ['U2-A', 'U2-B', 'U2-C'], ['U3-A', 'U3-B', 'U3-C'], ['U4-A', 'U4-B', 'U4-C'],
]

export const BLOK_MISI = [
  { id: 1, judul: 'Latihan Misi 1', tema: 'Jual beli dan umum', deskripsi: 'Dari jual beli sampai soal cerita bertahap.', aktif: true,
    slots: susun(POOL_BLOK1, { 1: ['T1-D'], 2: ['T2-D'], 3: ['T3-A'], 4: ['T4-D'] }) },
  { id: 2, judul: 'Latihan Misi 2', tema: 'Bilangan dan umur', deskripsi: 'Soal tentang bilangan, umur, dan perbandingan.', aktif: true, slots: susun() },
  { id: 3, judul: 'Latihan Misi 3', tema: 'Geometri', deskripsi: 'Keliling, luas, dan sudut yang menuntut SPLDV.', aktif: true, slots: susun() },
  { id: 4, judul: 'Latihan Misi 4', tema: 'Gerak dan campuran', deskripsi: 'Kecepatan, arus, dan harga campuran.', aktif: false, slots: susun() },
  { id: 5, judul: 'Latihan Misi 5', tema: 'Gabungan semua tema', deskripsi: 'Gabungan dari semua tema.', aktif: false, slots: susun() },
]
