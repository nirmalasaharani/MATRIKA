# MATRIKA (prototipe)

Menjalankan: `npm install` lalu `npm run dev`, buka http://localhost:5173
Tidak ada akun demo: buat akun lewat halaman Daftar (peran Siswa atau Guru).

Status:
- Tahap A: login/daftar, navbar, beranda.
- Tahap B: Misi Kontekstual (40 soal, Strategy Builder, foto simulasi, MathGuide, hasil).
- Tahap C (kelas 8): Materi (teks + video), Bank Soal, Latihan Biasa (timer), Try Out (timer), Riwayat.
  Kelas 7 dan 9 menyusul: halamannya sudah siap, tinggal isi data.

Memeriksa konten: `npm run verifikasi` (menghitung ulang semua kunci jawaban)
Uji otomatis alur aplikasi: `npm test`

Mengisi video YouTube: buka src/data/materi-kelas8.js, isi videoYoutubeId tiap bab
(ID adalah bagian setelah "v=" pada alamat video, misalnya dQw4w9WgXcQ).

Berkas data: src/data/ (bab.js, materi-kelasX.js, soal-kelasX.js, tryout.js, misi-spldv.js, konfigurasi.js)
