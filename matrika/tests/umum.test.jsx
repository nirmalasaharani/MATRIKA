import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../src/App.jsx'
import { AuthProvider } from '../src/lib/auth.jsx'
import { SEMUA_SOAL, TRYOUT } from '../src/lib/konten.js'
import { rapikan } from '../src/lib/tampil.js'

const buka = (rute) => render(<MemoryRouter initialEntries={[rute]}><AuthProvider><App /></AuthProvider></MemoryRouter>)

async function daftarKelas8(u) {
  buka('/daftar')
  await u.type(screen.getByLabelText('Nama lengkap'), 'Tester Delapan')
  await u.selectOptions(screen.getByLabelText('Kelas'), '8')
  await u.type(screen.getByLabelText('Email'), 'tes8@sekolah.id')
  await u.type(screen.getByLabelText('Kata sandi'), 'rahasia1')
  await u.type(screen.getByLabelText('Ulangi kata sandi'), 'rahasia1')
  await u.click(screen.getByRole('button', { name: 'Daftar' }))
  expect(await screen.findByText(/Halo, Tester/)).toBeTruthy()
  cleanup()
}

// Menjawab satu soal Ujian dengan jawaban yang benar (dicari dari data berdasarkan teks soal)
async function jawabBenar(u, cari) {
  const teks = screen.getByTestId('pertanyaan').textContent
  const s = cari(teks)
  expect(s, 'soal tidak ditemukan: ' + teks).toBeTruthy()
  if (s.tipe === 'pg') await u.click(within(screen.getByRole('radiogroup')).getByText(rapikan(s.kunci), { exact: true }))
  else await u.type(screen.getByLabelText('Jawaban'), Array.isArray(s.kunci) ? s.kunci[0] : s.kunci)
}

describe('Materi', () => {
  beforeEach(() => { localStorage.clear(); cleanup() })
  it('menampilkan semua bab kelas 8, kelas lain kosong dengan ramah, detail, video, dan tanda dibaca', async () => {
    const u = userEvent.setup()
    await daftarKelas8(u)
    buka('/materi')
    expect(await screen.findByText('Pola Bilangan')).toBeTruthy()
    for (const j of ['Relasi dan Fungsi', 'Persamaan Garis Lurus', 'Sistem Persamaan Linear Dua Variabel', 'Teorema Pythagoras', 'Lingkaran', 'Bangun Ruang Sisi Datar', 'Statistika dan Peluang']) expect(screen.getByText(j), j).toBeTruthy()
    await u.click(screen.getByRole('tab', { name: 'Kelas 7' }))
    expect(screen.getByText(/Materi untuk kelas 7 sedang disusun/)).toBeTruthy()
    await u.click(screen.getByRole('tab', { name: 'Kelas 8' }))
    await u.type(screen.getByLabelText('Cari bab'), 'pythagoras')
    expect(screen.queryByText('Pola Bilangan')).toBeNull()
    cleanup()

    buka('/materi/k8-pola')
    expect(await screen.findByText('Tujuan belajar')).toBeTruthy()
    expect(screen.getAllByText('Contoh soal').length).toBeGreaterThanOrEqual(2)
    expect(document.querySelector('svg[aria-label^="Pola bilangan segitiga"]')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Latihan bab ini/ }).getAttribute('href')).toBe('/latihan/biasa?bab=k8-pola')
    await u.click(screen.getByRole('tab', { name: 'Video' }))
    expect(screen.getByText('Video bab ini belum ditautkan')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Cari video di YouTube/ }).getAttribute('href')).toContain('youtube.com/results')
    cleanup()

    buka('/materi')
    expect(await screen.findByText('Sudah dibaca')).toBeTruthy()
  })
  it('semua bab kelas 8 bisa dibuka dan memuat ilustrasi', async () => {
    const u = userEvent.setup()
    await daftarKelas8(u)
    for (const id of ['k8-pola', 'k8-relasi', 'k8-garis', 'k8-spldv', 'k8-pythagoras', 'k8-lingkaran', 'k8-bangun', 'k8-statistika']) {
      buka(`/materi/${id}`)
      expect(await screen.findByText('Ringkasan'), id).toBeTruthy()
      expect(document.querySelectorAll('figure svg').length, id).toBeGreaterThan(0)
      cleanup()
    }
  })
})

describe('Bank Soal', () => {
  beforeEach(() => { localStorage.clear(); cleanup() })
  it('memfilter, menjawab benar dan salah, dan menandai soal', async () => {
    const u = userEvent.setup()
    await daftarKelas8(u)
    buka('/bank-soal')
    expect(await screen.findByText('80 soal ditemukan')).toBeTruthy()
    await u.selectOptions(screen.getByLabelText('Filter bab'), 'k8-garis')
    expect(screen.getByText('10 soal ditemukan')).toBeTruthy()
    await u.selectOptions(screen.getByLabelText('Filter tipe'), 'isian')
    expect(screen.getByText('4 soal ditemukan')).toBeTruthy()
    await u.selectOptions(screen.getByLabelText('Filter tipe'), '')

    const toggles = within(screen.getByRole('main')).getAllByRole('button', { expanded: false })
    await u.click(toggles[0])
    const teks = screen.getAllByText(/./, { selector: 'span.font-medium' })[0].textContent
    const s = SEMUA_SOAL.find((x) => rapikan(x.pertanyaan) === teks)
    expect(s).toBeTruthy()
    if (s.tipe === 'pg') await u.click(within(screen.getByRole('radiogroup')).getByText(rapikan(s.kunci), { exact: true }))
    else await u.type(screen.getByLabelText('Jawabanmu'), s.kunci)
    await u.click(screen.getByRole('button', { name: 'Cek jawaban' }))
    expect(screen.getByText('Jawabanmu benar!')).toBeTruthy()
    await u.click(screen.getByRole('button', { name: 'Coba lagi' }))
    if (s.tipe === 'pg') await u.click(within(screen.getByRole('radiogroup')).getByText(rapikan(s.pilihan.find((o) => o !== s.kunci)), { exact: true }))
    else await u.type(screen.getByLabelText('Jawabanmu'), '99999')
    await u.click(screen.getByRole('button', { name: 'Cek jawaban' }))
    expect(screen.getByText(/Belum tepat\. Kuncinya/)).toBeTruthy()
    await u.click(screen.getAllByRole('button', { name: 'Tandai soal' })[0])
    await u.selectOptions(screen.getByLabelText('Filter status'), 'ditandai')
    expect(screen.getByText('1 soal ditemukan')).toBeTruthy()
  })
})

describe('Latihan Biasa dan Try Out', () => {
  beforeEach(() => { localStorage.clear(); cleanup() })
  it('latihan biasa dengan timer: semua benar, skor tersimpan di riwayat dan beranda', async () => {
    const u = userEvent.setup()
    await daftarKelas8(u)
    buka('/latihan/biasa?bab=k8-pola')
    expect(await screen.findByText(/Tersedia 10 soal/)).toBeTruthy()
    await u.selectOptions(screen.getByLabelText('Jumlah soal'), '5')
    await u.click(screen.getByRole('button', { name: /Mulai latihan/ }))
    expect(screen.getByRole('timer').textContent).toMatch(/\d\d:\d\d/)
    const cari = (t) => SEMUA_SOAL.find((x) => rapikan(x.pertanyaan) === t)
    const tipe = new Set()
    for (let i = 0; i < 5; i++) {
      tipe.add(cari(screen.getByTestId('pertanyaan').textContent).tipe)
      await jawabBenar(u, cari)
      if (i < 4) await u.click(screen.getByRole('button', { name: 'Berikutnya' }))
    }
    expect(tipe.size).toBe(2) // campuran PG dan isian
    await u.click(screen.getByRole('button', { name: 'Selesai dan kirim' }))
    expect(screen.getByText((_, el) => el.tagName === 'P' && /Belum dijawab: 0\./.test(el.textContent))).toBeTruthy()
    await u.click(screen.getByRole('button', { name: 'Ya, kirim' }))
    expect(await screen.findByText('Skor 100')).toBeTruthy()
    expect(screen.getByText(/5 benar dari 5 soal/)).toBeTruthy()
    cleanup()

    buka('/riwayat')
    expect(await screen.findByText(/Latihan Biasa Kelas 8/)).toBeTruthy()
    cleanup()
    buka('/beranda')
    expect(await screen.findByText('Skor latihan terakhir')).toBeTruthy()
    expect(screen.getByText('100')).toBeTruthy()
  })

  it('try out: 15 soal isian dengan timer, kirim tanpa jawaban lalu dengan jawaban benar', async () => {
    const u = userEvent.setup()
    await daftarKelas8(u)
    buka('/tryout')
    expect(await screen.findByText('Try Out Kelas 8 - Paket 1')).toBeTruthy()
    expect(screen.getByText('Try Out Kelas 8 - Paket 2')).toBeTruthy()
    await u.click(screen.getAllByRole('button', { name: /Mulai try out/ })[0])
    expect(screen.getByRole('timer').textContent).toMatch(/4[45]:\d\d/)
    await u.click(screen.getByRole('button', { name: 'Selesai dan kirim' }))
    expect(screen.getByText((_, el) => el.tagName === 'P' && /Belum dijawab: 15\./.test(el.textContent))).toBeTruthy()
    await u.click(screen.getByRole('button', { name: 'Kembali' }))
    const paket = TRYOUT.find((t) => t.id === 'to-8-1')
    for (let i = 0; i < 15; i++) {
      await u.type(screen.getByLabelText('Jawaban'), paket.soal[i].kunci)
      if (i < 14) await u.click(screen.getByRole('button', { name: 'Berikutnya' }))
    }
    await u.click(screen.getByRole('button', { name: 'Selesai dan kirim' }))
    await u.click(screen.getByRole('button', { name: 'Ya, kirim' }))
    expect(await screen.findByText('Skor 100')).toBeTruthy()
    expect(screen.getByText(/15 benar dari 15 soal/)).toBeTruthy()
    await u.click(screen.getByRole('button', { name: /Kembali ke daftar try out/ }))
    expect(await screen.findByText('Skor terbaik: 100')).toBeTruthy()
  })
})
