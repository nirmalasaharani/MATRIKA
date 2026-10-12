// Akses terpadu ke konten fitur umum (kelas 7, 8, 9).
import { BAB } from '../data/bab.js'
import { MATERI as M7 } from '../data/materi-kelas7.js'
import { MATERI as M8 } from '../data/materi-kelas8.js'
import { MATERI as M9 } from '../data/materi-kelas9.js'
import { SOAL as S7 } from '../data/soal-kelas7.js'
import { SOAL as S8 } from '../data/soal-kelas8.js'
import { SOAL as S9 } from '../data/soal-kelas9.js'
import { TRYOUT } from '../data/tryout.js'

export { BAB, TRYOUT }
export const SEMUA_MATERI = [...M7, ...M8, ...M9]
export const SEMUA_SOAL = [...S7, ...S8, ...S9]
export const babKelas = (k) => BAB.filter((b) => b.kelas === k)
export const babById = (id) => BAB.find((b) => b.id === id)
export const materiBab = (id) => SEMUA_MATERI.find((m) => m.babId === id)
export const soalBab = (id) => SEMUA_SOAL.filter((s) => s.babId === id)
export const soalKelas = (k) => SEMUA_SOAL.filter((s) => s.kelas === k)
