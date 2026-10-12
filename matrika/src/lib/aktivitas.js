// Ringkasan aktivitas siswa untuk Beranda, dibaca dari data nyata di localStorage.
import { BLOK_MISI } from '../data/latihan-misi.js'
import { muatBlok, kuota } from './progresMisi.js'
import { ringkasan } from './alur.js'
import { bacaRiwayat, bacaJejak } from './riwayat.js'

const KOSONG = {
  misi: { blokTerakhir: null, slotTerakhir: 0, selesaiSlot: 0, blokSelesai: 0 },
  mathguideMingguIni: 0, kuotaMisiTerpakai: 0, skorTryOut: null, skorLatihan: null, terakhirDibuka: [],
}

export function bacaAktivitas(user) {
  if (!user) return KOSONG
  const seminggu = Date.now() - 7 * 24 * 3600 * 1000
  let terakhir = null, waktuMax = 0, blokSelesai = 0, bantuan = 0
  for (const blok of BLOK_MISI.filter((b) => b.aktif)) {
    const d = muatBlok(user.id, blok)
    if (d.progres.selesai) blokSelesai++
    Object.values(d.progres.slot).forEach((s) => s.percobaan.forEach((p) => {
      if (p.waktu > waktuMax) { waktuMax = p.waktu; terakhir = { blok, d } }
      if (p.waktu >= seminggu) bantuan += p.sinyal.bantuan || 0
    }))
  }
  const riw = bacaRiwayat(user.id)
  const skorTryOut = riw.find((r) => r.jenis === 'tryout')?.skor ?? null
  const skorLatihan = riw.find((r) => r.jenis === 'latihan')?.skor ?? null
  const k = kuota(user.id)
  const jejak = [...bacaJejak(user.id)]
  let misi = { ...KOSONG.misi, blokSelesai }
  if (terakhir) {
    const { blok, d } = terakhir
    const slot = Math.min(12, d.progres.slotSekarang)
    misi = { blokTerakhir: blok.id, slotTerakhir: slot, selesaiSlot: ringkasan(d.progres).selesai, blokSelesai }
    jejak.push({ jenis: 'Misi Kontekstual', judul: `${blok.judul}, soal ${slot}`, ke: `/misi/${blok.id}`, waktu: waktuMax })
  }
  jejak.sort((a, b) => b.waktu - a.waktu)
  return { misi, mathguideMingguIni: bantuan, kuotaMisiTerpakai: k.terpakai, skorTryOut, skorLatihan, terakhirDibuka: jejak.slice(0, 4) }
}
