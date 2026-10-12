import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../src/App.jsx'
import { AuthProvider } from '../src/lib/auth.jsx'
import TampilanSoal from '../src/components/Tampilan.jsx'
import { SOAL_MISI, SOAL_BY_ID } from '../src/data/misi-spldv.js'

const buka = (rute) => render(<MemoryRouter initialEntries={[rute]}><AuthProvider><App /></AuthProvider></MemoryRouter>)

async function daftar(u) {
  buka('/daftar')
  await u.type(screen.getByLabelText('Nama lengkap'), 'Tester Siswa')
  await u.type(screen.getByLabelText('Email'), 'tes@sekolah.id')
  await u.type(screen.getByLabelText('Kata sandi'), 'rahasia1')
  await u.type(screen.getByLabelText('Ulangi kata sandi'), 'rahasia1')
  await u.click(screen.getByRole('button', { name: 'Daftar' }))
  expect(await screen.findByText(/Halo, Tester/)).toBeTruthy()
  cleanup()
}

// Mengisi Strategy Builder dari kunci soal (atau dengan jawaban salah)
async function kerjakan(u, soal, { benar = true } = {}) {
  const k = soal.kunci
  await u.selectOptions(screen.getByLabelText(/Jenis masalah/), benar ? soal.konsep : 'lainnya')
  if (benar && soal.konsep === 'bukan-SPLDV') await u.selectOptions(screen.getByLabelText('Alasannya'), soal.alasan)
  const pers = benar ? k.persamaan : ['x = 1']
  for (let i = 0; i < pers.length; i++) {
    if (i > 0) await u.click(screen.getByRole('button', { name: /Tambah persamaan/ }))
    await u.type(screen.getByLabelText(`Persamaan ${i + 1}`), pers[i])
  }
  const jaw = soal.jawabTipe === 'dua-pasang' ? k.contohPasangan : k.nilai || []
  for (let i = 0; i < soal.jawab.length; i++) {
    await u.type(screen.getByLabelText(soal.jawab[i].label), benar ? String(jaw[i]) : '1')
  }
  await u.click(screen.getByRole('button', { name: 'Kirim jawaban' }))
}

describe('Tampilan soal', () => {
  it('semua soal bergambar/bertabel dirender', () => {
    for (const s of SOAL_MISI.filter((x) => x.tampilan)) {
      const { container } = render(<TampilanSoal t={s.tampilan} />)
      expect(container.querySelector(s.tampilan.tipe === 'tabel' ? 'table' : 'svg'), s.id).toBeTruthy()
      cleanup()
    }
  })
})

describe('Alur Misi di aplikasi', () => {
  beforeEach(() => { localStorage.clear(); cleanup() })

  it('daftar, kerjakan slot 1 benar, slot 2 salah lalu varian, MathGuide, dilewati', async () => {
    const u = userEvent.setup()
    await daftar(u)

    // Peta Misi
    buka('/misi')
    expect(await screen.findByText('Latihan Misi 1')).toBeTruthy()
    expect(screen.getAllByText('Soal sedang disiapkan').length).toBe(2)
    cleanup()

    // Slot 1 (T1-A): benar
    buka('/misi/1/soal')
    expect(await screen.findByText('Alat Tulis Ani dan Budi')).toBeTruthy()
    expect(screen.getByText('Percobaan 1 dari 3')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Kirim jawaban' }).disabled).toBe(true)
    await kerjakan(u, SOAL_BY_ID['T1-A'])
    expect(await screen.findByText('Hebat! Jawabanmu benar.')).toBeTruthy()
    expect(screen.getByText(/Lanjut ke soal 2 dari 12/)).toBeTruthy()
    expect(screen.getByText(/Soal ini beda|Ini soal pertamamu/)).toBeTruthy()
    cleanup()

    // Slot 2 (T2-A): salah
    buka('/misi/1/soal')
    expect(await screen.findByText('Mangga dan Jambu (satu pembeli)')).toBeTruthy()
    await kerjakan(u, SOAL_BY_ID['T2-A'], { benar: false })
    expect(await screen.findByText('Belum tepat, tapi tidak apa-apa.')).toBeTruthy()
    expect(screen.getByText(/percobaan 2 dari 3/)).toBeTruthy()
    cleanup()

    // Varian 1 (T2-B): form rincian terbuka otomatis, MathGuide level 1 otomatis, lalu minta bantuan
    buka('/misi/1/soal')
    expect(await screen.findByText('Mangga dan Jambu (dua pembeli)')).toBeTruthy()
    expect(screen.getByText('Percobaan 2 dari 3')).toBeTruthy()
    expect(screen.getByText('Dianjurkan')).toBeTruthy()
    expect(screen.getByLabelText('Apa yang diketahui?')).toBeTruthy()
    await u.click(screen.getByRole('button', { name: /Tanya MathGuide/ }))
    const panel = screen.getByRole('dialog', { name: 'MathGuide' })
    expect(within(panel).getByText(SOAL_BY_ID['T2-B'].mg.level1)).toBeTruthy()
    expect(within(panel).getByText(/terpakai di soal ini: 0\//)).toBeTruthy()
    await u.click(within(panel).getByRole('button', { name: 'Beri petunjuk' }))
    expect(within(panel).getByText(/terpakai di soal ini: 1\//)).toBeTruthy()
    await u.click(within(panel).getByRole('button', { name: 'Rumus apa yang kupakai?' }))
    expect(within(panel).getByText('Membentuk model')).toBeTruthy()
    expect(within(panel).getByText(/terpakai di soal ini: 1\//)).toBeTruthy() // rumus tidak dihitung
    await u.click(within(panel).getAllByText(/Tandai jawaban ini tidak sesuai/)[0])
    await u.click(within(panel).getByRole('button', { name: 'Tutup MathGuide' }))
    await kerjakan(u, SOAL_BY_ID['T2-B'], { benar: false })
    expect(await screen.findByText('Belum tepat, tapi tidak apa-apa.')).toBeTruthy()
    cleanup()

    // Varian 2 (T2-C): salah lagi -> dilewati dengan pembahasan
    buka('/misi/1/soal')
    expect(await screen.findByText('Dua Bilangan, Hasil Kali')).toBeTruthy()
    expect(screen.getByText('Percobaan 3 dari 3')).toBeTruthy()
    await u.selectOptions(screen.getByLabelText(/Jenis masalah/), 'SPLDV')
    await u.type(screen.getByLabelText('Persamaan 1'), 'x = 1')
    await u.click(screen.getByRole('button', { name: 'Kirim jawaban' }))
    expect(await screen.findByText('Kita lihat contoh langkahnya, lalu lanjut ya.')).toBeTruthy()
    expect(screen.getByText('Contoh: persamaan tidak linear')).toBeTruthy()
    cleanup()

    // Jalur: status per slot
    buka('/misi/1')
    expect(await screen.findByLabelText(/Soal 1, Soal Utuh, Lulus langsung/)).toBeTruthy()
    expect(screen.getByLabelText(/Soal 2, Kontras, Dilewati/)).toBeTruthy()
    expect(screen.getByLabelText(/Soal 3, Generalisasi, Sekarang/)).toBeTruthy()
    cleanup()

    // Guard: blok yang belum tersedia dialihkan ke /misi
    buka('/misi/2/soal')
    expect(await screen.findByText('Latihan Misi 3')).toBeTruthy()
  })

  it('mengerjakan benar ke-12 slot sampai tuntas, semua tipe soal', async () => {
    const u = userEvent.setup()
    await daftar(u)
    const urut = ['T1-A', 'T2-A', 'T3-B', 'T4-A', 'S1-A', 'S2-A', 'S3-A', 'S4-A', 'U1-A', 'U2-A', 'U3-A', 'U4-A']
    for (let i = 0; i < 12; i++) {
      buka('/misi/1/soal')
      expect(await screen.findByText(SOAL_BY_ID[urut[i]].judul), urut[i]).toBeTruthy()
      await kerjakan(u, SOAL_BY_ID[urut[i]])
      expect(await screen.findByText('Hebat! Jawabanmu benar.'), urut[i]).toBeTruthy()
      if (i === 3) expect(screen.getByText('Level Mudah selesai!')).toBeTruthy()
      if (i === 7) expect(screen.getByText('Level Sedang selesai!')).toBeTruthy()
      if (i === 11) expect(screen.getByText('Latihan Misi 1 tuntas!')).toBeTruthy()
      cleanup()
    }
    buka('/beranda')
    expect(await screen.findByText('1/3')).toBeTruthy() // blok selesai 1 dari 3
  })
})

describe('Foto simulasi', () => {
  beforeEach(() => { localStorage.clear(); cleanup() })
  it('mengisi kolom dari data soal, memberi tanda, dan tanda hilang saat diedit', async () => {
    // jsdom tidak punya canvas/Image sungguhan: tiru secukupnya
    HTMLCanvasElement.prototype.getContext = () => ({ drawImage() {} })
    HTMLCanvasElement.prototype.toDataURL = () => 'data:image/jpeg;base64,AAAA'
    globalThis.Image = class { set src(_) { this.width = 100; this.height = 100; setTimeout(() => this.onload?.(), 0) } }
    const u = userEvent.setup()
    await daftar(u)
    buka('/misi/1/soal')
    expect(await screen.findByText('Alat Tulis Ani dan Budi')).toBeTruthy()
    const input = document.querySelector('input[type=file]')
    await u.upload(input, new File(['x'], 'langkah.jpg', { type: 'image/jpeg' }))
    const tombol = await screen.findByRole('button', { name: /Bantu isi dari foto/ })
    await u.click(tombol)
    expect(await screen.findByText(/Membaca foto/)).toBeTruthy()
    const f = SOAL_BY_ID['T1-A'].foto
    expect((await screen.findAllByText('Terisi dari foto, periksa dulu', {}, { timeout: 4000 })).length).toBe(3) // persamaan, diketahui, ditanyakan
    expect(screen.getByLabelText('Persamaan 1').value).toBe(f.persamaan)
    expect(screen.getByLabelText('Apa yang diketahui?').value).toBe(f.diketahui)
    expect(screen.getByLabelText('Rumus yang digunakan').value).toBe('') // kolom kosong di data tetap kosong
    await u.type(screen.getByLabelText('Apa yang diketahui?'), ' ok') // diedit -> tanda hilang
    expect(screen.getAllByText('Terisi dari foto, periksa dulu').length).toBe(2)
    await u.click(screen.getAllByRole('button', { name: 'Sudah benar' })[0]) // dikonfirmasi
    expect(screen.getAllByText('Terisi dari foto, periksa dulu').length).toBe(1)
  })
})
