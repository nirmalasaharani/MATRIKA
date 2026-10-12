// Bantuan MathGuide (simulasi). Level 3 memakai contoh pada soal LAIN, bukan soal yang sedang dikerjakan.
export const CONTOH_MATHGUIDE = {
  'contoh-1': { judul: 'Contoh: harga pensil dan penghapus', langkah: [
    'Soal lain: 2 pensil dan 1 penghapus Rp7.000; 1 pensil dan 2 penghapus Rp8.000.',
    'Misalkan p = harga pensil, h = harga penghapus. (1) 2p + h = 7.000; (2) p + 2h = 8.000.',
    'Kalikan (1) dengan 2: 4p + 2h = 14.000. Kurangkan (2): 3p = 6.000, jadi p = 2.000.',
    'Substitusi ke (1): 4.000 + h = 7.000, jadi h = 3.000.',
    'Cek ke (2): 2.000 + 6.000 = 8.000 (benar).'] },
  'contoh-2a': { judul: 'Contoh: satu persamaan dua variabel', langkah: [
    'Persamaan x + 2y = 10 saja.',
    'Pasangan (2, 4), (4, 3), dan (6, 2) semuanya memenuhi.',
    'Karena ada banyak pasangan, satu persamaan dua variabel bukan SPLDV.'] },
  'contoh-2b': { judul: 'Contoh: jumlah dan selisih', langkah: [
    'x + y = 9 dan x - y = 3.',
    'Jumlahkan kedua persamaan: 2x = 12, jadi x = 6.',
    'Substitusi: 6 + y = 9, jadi y = 3.',
    'Cek: 6 - 3 = 3 (benar).'] },
  'contoh-2c': { judul: 'Contoh: persamaan tidak linear', langkah: [
    'x + y = 5 dan x · y = 6.',
    'Persamaan kedua memuat perkalian dua variabel, jadi tidak linear.',
    'Sistem ini bukan SPLDV.'] },
  'contoh-3': { judul: 'Contoh: membaca tabel', langkah: [
    'Tabel: baris 1: 1 mie dan 2 teh dibayar Rp11.000; baris 2: 2 mie dan 1 teh dibayar Rp16.000.',
    'Tiap baris menjadi satu persamaan: m + 2t = 11.000 dan 2m + t = 16.000.',
    'Dari persamaan pertama m = 11.000 - 2t. Substitusi: 22.000 - 4t + t = 16.000, jadi t = 2.000 dan m = 7.000.',
    'Cek ke kedua persamaan (benar).'] },
  'contoh-4': { judul: 'Contoh: keliling persegi panjang', langkah: [
    'Keliling persegi panjang 30 cm, panjang 3 cm lebih dari lebar.',
    'Keliling = 2(p + l), jadi p + l = 15 dan p - l = 3.',
    'Jumlahkan: 2p = 18, jadi p = 9 dan l = 6.',
    'Cek: 2(9 + 6) = 30 (benar).'] },
  'contoh-5': { judul: 'Contoh: umur', langkah: [
    'Umur Ibu 3 kali umur Rani dan jumlah umur mereka 48 tahun.',
    'Misalkan i umur Ibu dan r umur Rani. (1) i = 3r; (2) i + r = 48.',
    'Substitusi: 3r + r = 48, 4r = 48, jadi r = 12 dan i = 36.',
    'Cek: 36 = 3 x 12 dan 36 + 12 = 48 (benar).'] },
}

export const RUMUS = {
  model: { judul: 'Membentuk model', isi: 'Beri nama pada dua hal yang dicari (misalnya x dan y). Setiap informasi di soal yang menghubungkan keduanya menjadi satu persamaan. SPLDV butuh dua persamaan yang berbeda.' },
  eliminasi: { judul: 'Eliminasi', isi: 'Samakan koefisien salah satu variabel di kedua persamaan (kalikan persamaan dengan bilangan yang tepat), lalu jumlahkan atau kurangkan agar variabel itu hilang. Selesaikan variabel yang tersisa, lalu cari variabel satunya.' },
  substitusi: { judul: 'Substitusi', isi: 'Nyatakan satu variabel dari salah satu persamaan (misalnya y = ...), masukkan ke persamaan lainnya, selesaikan, lalu hitung variabel yang satunya.' },
  grafik: { judul: 'Grafik', isi: 'Gambar tiap persamaan sebagai garis lurus (cari dua titik). Titik potong kedua garis adalah penyelesaian yang memenuhi kedua persamaan.' },
}

export const PESAN = {
  batas: 'Kamu sudah memakai semua bantuan untuk soal ini. Coba tulis langkah berikutnya sendiri, kamu pasti bisa. Kalau masih bingung, kita bahas setelah kamu mengirim jawaban.',
  modelBenar: 'Persamaanmu sudah mengarah tepat. Sekarang coba hilangkan satu variabel: apakah koefisien salah satu variabel di kedua persamaan sudah sama?',
  contohPengantar: 'Ini contoh langkah pada soal yang mirip (bukan soal ini). Coba tiru alurnya untuk soalmu.',
  luarKonteks: 'Aku bantu soal misi ini ya. Coba ceritakan bagian mana yang membingungkan.',
}
