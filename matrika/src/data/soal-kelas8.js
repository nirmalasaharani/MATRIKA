// Bank soal kelas 8: 8 bab x 10 soal (6 pilihan ganda + 4 isian). Kunci PG berupa teks opsi yang benar.
// Field "cek" = ekspresi hitung untuk verifikasi otomatis (scripts/verifikasi-umum.mjs); tidak ditampilkan ke siswa.
// Posisi jawaban benar (0=A ... 3=D) dibuat seimbang: tiap huruf 12 kali dari 48 soal PG.
const POSISI = [1, 0, 0, 1, 2, 2, 1, 0, 3, 2, 2, 3, 1, 1, 0, 3, 0, 2, 1, 3, 0, 0, 1, 3, 3, 2, 2, 0, 2, 2, 0, 3, 1, 1, 3, 2, 2, 0, 2, 3, 3, 1, 1, 0, 3, 1, 3, 0]
let hitungPg = 0
const letakkan = (pilihan, benar) => {
  const kunci = pilihan[benar]
  const lain = pilihan.filter((_, i) => i !== benar)
  lain.splice(POSISI[hitungPg++ % POSISI.length], 0, kunci)
  return lain
}

const buat = (babId) => {
  let n = 0
  const id = () => `${babId}-${String(++n).padStart(2, '0')}`
  return {
    pg: (tingkat, pertanyaan, pilihan, benar, pembahasan, cek) => ({ id: id(), kelas: 8, babId, tipe: 'pg', tingkat, pertanyaan, pilihan: letakkan(pilihan, benar), kunci: pilihan[benar], pembahasan, ...(cek ? { cek } : {}) }),
    isi: (tingkat, pertanyaan, kunci, pembahasan, cek) => ({ id: id(), kelas: 8, babId, tipe: 'isian', tingkat, pertanyaan, kunci, pembahasan, ...(cek ? { cek } : {}) }),
  }
}

const A = buat('k8-pola')
const B = buat('k8-relasi')
const C = buat('k8-garis')
const D = buat('k8-spldv')
const E = buat('k8-pythagoras')
const F = buat('k8-lingkaran')
const G = buat('k8-bangun')
const H = buat('k8-statistika')

export const SOAL = [
  // ---- Pola Bilangan ----
  A.pg('mudah', 'Bilangan berikutnya dari barisan 2, 5, 8, 11, ... adalah ...', ['13', '14', '15', '16'], 1, 'Bedanya 3, jadi 11 + 3 = 14.', '11+3'),
  A.pg('mudah', 'Rumus suku ke-n dari barisan 5, 9, 13, 17, ... adalah ...', ['4n + 1', '4n - 1', '5n + 4', 'n + 4'], 0, 'a = 5 dan b = 4, sehingga Un = 5 + (n - 1) x 4 = 4n + 1.'),
  A.pg('sedang', 'Suku ke-20 dari barisan 7, 10, 13, 16, ... adalah ...', ['67', '61', '64', '70'], 2, 'a = 7, b = 3. U20 = 7 + 19 x 3 = 64.', '7+19*3'),
  A.pg('sedang', 'Suku ke-7 dari barisan geometri 3, 6, 12, 24, ... adalah ...', ['96', '192', '384', '144'], 1, 'Rasio r = 2. U7 = 3 x 2^6 = 3 x 64 = 192.', '3*2**6'),
  A.pg('sedang', 'Pola bilangan persegi: 1, 4, 9, 16, ... Bilangan ke-12 dari pola ini adalah ...', ['121', '132', '144', '156'], 2, 'Bilangan persegi ke-n adalah n^2, jadi 12^2 = 144.', '12*12'),
  A.pg('sulit', 'Pada barisan aritmetika, suku ke-5 adalah 17 dan suku ke-9 adalah 37. Suku ke-20 adalah ...', ['87', '97', '102', '92'], 3, 'U9 - U5 = 4b = 20, jadi b = 5. a = 17 - 4 x 5 = -3. U20 = -3 + 19 x 5 = 92.', '-3+19*5'),
  A.isi('mudah', 'Tentukan suku ke-8 dari barisan 4, 9, 14, 19, ...', '39', 'Beda b = 5. U8 = 4 + 7 x 5 = 39.', '4+7*5'),
  A.isi('sedang', 'Suku ke-15 dari barisan 100, 94, 88, 82, ... adalah ...', '16', 'Beda b = -6. U15 = 100 + 14 x (-6) = 16.', '100+14*(-6)'),
  A.isi('sedang', 'Rina menabung Rp5.000 pada minggu pertama. Setiap minggu berikutnya tabungannya naik Rp2.000 dari minggu sebelumnya. Berapa rupiah tabungan Rina pada minggu ke-10?', '23000', 'a = 5.000 dan b = 2.000. U10 = 5.000 + 9 x 2.000 = 23.000.', '5000+9*2000'),
  A.isi('sulit', 'Pada barisan geometri, suku ke-2 adalah 6 dan suku ke-5 adalah 162. Suku ke-4 adalah ...', '54', 'U5 : U2 = r^3 = 27, jadi r = 3. U4 = U2 x r^2 = 6 x 9 = 54.', '6*3**2'),

  // ---- Relasi dan Fungsi ----
  B.pg('sedang', 'Diketahui A = {1, 2, 3} dan B = {a, b, c}. Relasi berikut yang BUKAN fungsi dari A ke B adalah ...', ['{(1,a), (2,b), (3,c)}', '{(1,a), (2,a), (3,b)}', '{(1,a), (1,b), (2,c), (3,c)}', '{(1,c), (2,c), (3,c)}'], 2, 'Anggota 1 berpasangan dengan dua anggota B (a dan b), jadi relasi itu bukan fungsi.'),
  B.pg('mudah', 'Jika f(x) = 2x + 5, maka f(3) = ...', ['8', '11', '13', '16'], 1, 'f(3) = 2(3) + 5 = 11.', '2*3+5'),
  B.pg('mudah', 'Domain dari fungsi {(1, 2), (3, 4), (5, 6)} adalah ...', ['{2, 4, 6}', '{1, 3, 5}', '{1, 2, 3}', '{4, 5, 6}'], 1, 'Domain adalah himpunan anggota pertama dari tiap pasangan, yaitu {1, 3, 5}.'),
  B.pg('sedang', 'Fungsi f(x) = ax + b memenuhi f(1) = 5 dan f(2) = 8. Nilai f(10) adalah ...', ['30', '32', '35', '28'], 1, 'a = 8 - 5 = 3, lalu b = 5 - 3 = 2. f(10) = 30 + 2 = 32.', '3*10+2'),
  B.pg('sedang', 'Banyak pemetaan yang mungkin dari himpunan A (3 anggota) ke himpunan B (4 anggota) adalah ...', ['12', '24', '64', '81'], 2, 'Banyak pemetaan = n(B)^n(A) = 4^3 = 64.', '4**3'),
  B.pg('sulit', 'Fungsi f(x) = px + q dengan f(-2) = -7 dan f(3) = 8. Nilai f(5) adalah ...', ['11', '16', '14', '19'], 2, 'p = (8 - (-7)) : (3 - (-2)) = 15 : 5 = 3. q = 8 - 9 = -1. f(5) = 15 - 1 = 14.', '3*5-1'),
  B.isi('mudah', 'Jika f(x) = x^2 - 3x, nilai f(5) adalah ...', '10', 'f(5) = 25 - 15 = 10.', '25-15'),
  B.isi('sedang', 'Diketahui f(x) = 4x - 7. Jika f(a) = 21, nilai a adalah ...', '7', '4a - 7 = 21, maka 4a = 28 dan a = 7.', '(21+7)/4'),
  B.isi('sedang', 'Banyak korespondensi satu-satu yang mungkin dari A = {1, 2, 3, 4} ke B = {a, b, c, d} adalah ...', '24', 'Banyaknya = 4! = 4 x 3 x 2 x 1 = 24.', '4*3*2*1'),
  B.isi('sulit', 'Tarif sebuah taksi online: biaya awal Rp10.000 ditambah Rp4.000 untuk setiap kilometer. Jika Dewi membayar Rp34.000, berapa kilometer jarak perjalanannya?', '6', 'f(x) = 10.000 + 4.000x = 34.000, maka 4.000x = 24.000 dan x = 6.', '(34000-10000)/4000'),

  // ---- Persamaan Garis Lurus ----
  C.pg('mudah', 'Gradien garis y = 4x - 3 adalah ...', ['-3', '4', '3', '1/4'], 1, 'Pada bentuk y = mx + c, gradiennya m = 4.'),
  C.pg('mudah', 'Gradien garis yang melalui titik (2, 1) dan (6, 9) adalah ...', ['4', '1/2', '2', '8'], 2, 'm = (9 - 1) : (6 - 2) = 8 : 4 = 2.', '(9-1)/(6-2)'),
  C.pg('sedang', 'Gradien garis 2x + 3y = 12 adalah ...', ['2/3', '-2/3', '3/2', '-3/2'], 1, 'Untuk ax + by = c, m = -a/b = -2/3.', '-2/3'),
  C.pg('sedang', 'Persamaan garis yang melalui (0, -2) dan bergradien 3 adalah ...', ['y = 3x + 2', 'y = -3x - 2', 'y = 3x - 2', 'y = 2x - 3'], 2, 'Titik (0, -2) ada di sumbu-y, jadi c = -2 dan persamaannya y = 3x - 2.'),
  C.pg('sedang', 'Persamaan garis yang sejajar y = 2x + 1 dan melalui titik (1, 5) adalah ...', ['y = 2x + 5', 'y = -2x + 7', 'y = 2x + 3', 'y = x + 4'], 2, 'Gradiennya sama, m = 2. y - 5 = 2(x - 1), sehingga y = 2x + 3.'),
  C.pg('sulit', 'Persamaan garis yang melalui (6, 1) dan tegak lurus garis 3x - y = 4 adalah ...', ['x - 3y = 9', '3x + y = 19', 'x + 3y = 3', 'x + 3y = 9'], 3, 'Garis 3x - y = 4 punya m = 3, jadi gradien yang tegak lurus = -1/3. y - 1 = -1/3 (x - 6), kalikan 3: 3y - 3 = -x + 6, sehingga x + 3y = 9.'),
  C.isi('mudah', 'Gradien garis yang melalui titik (-1, 4) dan (3, -4) adalah ...', '-2', 'm = (-4 - 4) : (3 - (-1)) = -8 : 4 = -2.', '(-4-4)/(3-(-1))'),
  C.isi('sedang', 'Garis y = mx + 5 melalui titik (2, 11). Nilai m adalah ...', '3', '11 = 2m + 5, maka m = 3.', '(11-5)/2'),
  C.isi('sedang', 'Garis 2x + y = 8 memotong sumbu-y di titik (0, k). Nilai k adalah ...', '8', 'Di sumbu-y, x = 0, sehingga y = 8.', '8'),
  C.isi('sulit', 'Garis h: 2y = 4x + 6. Garis g tegak lurus garis h. Gradien garis g adalah ...', '-1/2', 'Garis h: y = 2x + 3, jadi m = 2. Untuk garis yang tegak lurus, m x 2 = -1, sehingga m = -1/2.', '-1/2'),

  // ---- SPLDV ----
  D.pg('mudah', 'Dari x + y = 5 dan x - y = 1, nilai x adalah ...', ['2', '3', '4', '5'], 1, 'Jumlahkan kedua persamaan: 2x = 6, jadi x = 3.', '(5+1)/2'),
  D.pg('mudah', 'Jika x = 4 dan x + 2y = 10, maka nilai y adalah ...', ['3', '2', '4', '6'], 0, '4 + 2y = 10, maka 2y = 6 dan y = 3.', '(10-4)/2'),
  D.pg('sedang', 'Diketahui 3x + 2y = 16 dan x + 2y = 8. Nilai x + y adalah ...', ['5', '6', '7', '8'], 1, 'Kurangkan: 2x = 8, jadi x = 4. Lalu 4 + 2y = 8, jadi y = 2. Maka x + y = 6.', '4+2'),
  D.pg('sedang', 'Jumlah umur Ayah dan Ibu 85 tahun. Ayah 5 tahun lebih tua dari Ibu. Umur Ibu adalah ... tahun.', ['35', '40', '45', '50'], 1, 'a + i = 85 dan a - i = 5. Kurangkan: 2i = 80, jadi i = 40.', '(85-5)/2'),
  D.pg('sedang', 'Diketahui 2x - y = 3 dan x + y = 9. Nilai 2x + y adalah ...', ['11', '12', '13', '14'], 2, 'Jumlahkan: 3x = 12, x = 4. Lalu y = 5. Maka 2x + y = 13.', '2*4+5'),
  D.pg('sulit', 'Diketahui 4x - 3y = 11 dan 2x + 5y = -1. Nilai x . y adalah ...', ['2', '-1', '1', '-2'], 3, 'Kalikan persamaan kedua dengan 2: 4x + 10y = -2. Kurangkan dari persamaan pertama: -13y = 13, y = -1. Lalu 2x - 5 = -1, x = 2. Maka xy = -2.', '2*(-1)'),
  D.isi('mudah', 'Jika x + y = 12 dan x - y = 4, nilai x adalah ...', '8', 'Jumlahkan: 2x = 16, jadi x = 8.', '(12+4)/2'),
  D.isi('sedang', 'Diketahui y = 2x dan x + y = 21. Nilai y adalah ...', '14', 'Substitusi: x + 2x = 21, jadi x = 7 dan y = 14.', '2*7'),
  D.isi('sedang', 'Jumlah dua bilangan 40 dan selisihnya 12. Bilangan yang lebih besar adalah ...', '26', 'Bilangan besar = (40 + 12) : 2 = 26.', '(40+12)/2'),
  D.isi('sulit', 'Sebuah toko menjual 2 kemeja dan 3 celana seharga Rp410.000. Pembelian 3 kemeja dan 2 celana seharga Rp390.000. Berapa rupiah harga sebuah kemeja?', '70000', 'Jumlahkan: 5k + 5c = 800.000, jadi k + c = 160.000. Kurangkan (persamaan kedua - pertama): k - c = -20.000. Maka k = 70.000 dan c = 90.000. Cek: 2(70.000) + 3(90.000) = 410.000.', '(160000-20000)/2'),

  // ---- Teorema Pythagoras ----
  E.pg('mudah', 'Sisi siku-siku sebuah segitiga siku-siku 9 cm dan 12 cm. Panjang sisi miringnya adalah ...', ['13 cm', '14 cm', '15 cm', '21 cm'], 2, '81 + 144 = 225, dan akar 225 = 15.', 'Math.sqrt(81+144)'),
  E.pg('mudah', 'Kelompok bilangan berikut yang merupakan tripel Pythagoras adalah ...', ['4, 5, 6', '5, 12, 13', '6, 7, 8', '7, 8, 9'], 1, '5^2 + 12^2 = 25 + 144 = 169 = 13^2.'),
  E.pg('sedang', 'Sisi miring sebuah segitiga siku-siku 17 cm dan salah satu sisi sikunya 8 cm. Sisi siku-siku yang lain adalah ...', ['9 cm', '12 cm', '15 cm', '25 cm'], 2, '17^2 - 8^2 = 289 - 64 = 225, dan akar 225 = 15.', 'Math.sqrt(17*17-8*8)'),
  E.pg('sedang', 'Panjang diagonal persegi panjang berukuran 24 cm x 10 cm adalah ...', ['34 cm', '26 cm', '24 cm', '25 cm'], 1, '24^2 + 10^2 = 576 + 100 = 676, dan akar 676 = 26.', 'Math.sqrt(24*24+10*10)'),
  E.pg('sedang', 'Segitiga dengan panjang sisi 7 cm, 24 cm, dan 25 cm adalah segitiga ...', ['lancip', 'siku-siku', 'tumpul', 'sama sisi'], 1, '7^2 + 24^2 = 49 + 576 = 625 = 25^2, jadi segitiga siku-siku.'),
  E.pg('sulit', 'Jarak antara titik A(1, 2) dan B(7, 10) pada bidang koordinat adalah ... satuan.', ['8', '10', '12', '14'], 1, 'Selisih x = 6 dan selisih y = 8. Jarak = akar (36 + 64) = akar 100 = 10.', 'Math.sqrt(6*6+8*8)'),
  E.isi('mudah', 'Sisi siku-siku sebuah segitiga siku-siku 20 cm dan 21 cm. Panjang sisi miringnya (cm) adalah ...', '29', '400 + 441 = 841, dan akar 841 = 29.', 'Math.sqrt(400+441)'),
  E.isi('sedang', 'Sisi miring sebuah segitiga siku-siku 25 cm dan salah satu sisi sikunya 20 cm. Panjang sisi siku-siku yang lain (cm) adalah ...', '15', '625 - 400 = 225, dan akar 225 = 15.', 'Math.sqrt(625-400)'),
  E.isi('sedang', 'Budi berjalan 12 m ke timur, lalu 5 m ke utara. Jarak terdekat Budi dari titik awal (m) adalah ...', '13', 'Jarak = akar (144 + 25) = akar 169 = 13.', 'Math.sqrt(144+25)'),
  E.isi('sulit', 'Belah ketupat memiliki diagonal 16 cm dan 30 cm. Panjang sisi belah ketupat itu (cm) adalah ...', '17', 'Diagonal belah ketupat berpotongan tegak lurus dan saling membagi dua, jadi ada segitiga siku-siku dengan sisi 8 dan 15. Sisi = akar (64 + 225) = akar 289 = 17.', 'Math.sqrt(8*8+15*15)'),

  // ---- Lingkaran ----
  F.pg('mudah', 'Keliling lingkaran berjari-jari 7 cm (pi = 22/7) adalah ... cm.', ['22', '44', '154', '49'], 1, 'K = 2 x 22/7 x 7 = 44.', '2*22/7*7'),
  F.pg('mudah', 'Luas lingkaran berdiameter 20 cm (pi = 3,14) adalah ... cm2.', ['62,8', '314', '628', '31,4'], 1, 'r = 10, L = 3,14 x 10 x 10 = 314.', '3.14*10*10'),
  F.pg('sedang', 'Sudut pusat sebuah lingkaran 80 derajat. Sudut keliling yang menghadap busur yang sama besarnya ...', ['160 derajat', '40 derajat', '80 derajat', '100 derajat'], 1, 'Sudut keliling = setengah sudut pusat = 40 derajat.', '80/2'),
  F.pg('sedang', 'Panjang busur lingkaran berjari-jari 14 cm dengan sudut pusat 90 derajat (pi = 22/7) adalah ... cm.', ['11', '22', '44', '88'], 1, 'Keliling = 2 x 22/7 x 14 = 88. Busur = 90/360 x 88 = 22.', '90/360*2*22/7*14'),
  F.pg('sedang', 'Luas juring berjari-jari 8 cm dengan sudut pusat 45 derajat (pi = 3,14) adalah ... cm2.', ['50,24', '12,56', '25,12', '200,96'], 2, 'L juring = 45/360 x 3,14 x 64 = 25,12.', '45/360*3.14*64'),
  F.pg('sulit', 'Keliling sebuah lingkaran 66 cm (pi = 22/7). Luas lingkaran tersebut adalah ... cm2.', ['693', '154', '1386', '346,5'], 3, 'r = 66 : (2 x 22/7) = 10,5. L = 22/7 x 10,5 x 10,5 = 346,5.', '22/7*10.5*10.5'),
  F.isi('mudah', 'Keliling lingkaran berjari-jari 21 cm (pi = 22/7) adalah ... cm.', '132', 'K = 2 x 22/7 x 21 = 132.', '2*22/7*21'),
  F.isi('sedang', 'Luas sebuah lingkaran 154 cm2 (pi = 22/7). Panjang jari-jarinya (cm) adalah ...', '7', 'r^2 = 154 x 7 : 22 = 49, jadi r = 7.', 'Math.sqrt(154*7/22)'),
  F.isi('sedang', 'Roda sepeda berdiameter 70 cm (pi = 22/7). Jika roda berputar 10 kali, jarak yang ditempuh sepeda adalah ... cm.', '2200', 'Keliling roda = 22/7 x 70 = 220 cm. Untuk 10 putaran: 10 x 220 = 2.200 cm.', '10*22/7*70'),
  F.isi('sulit', 'Pada sebuah lingkaran, besar sudut pusat AOB = (3x + 10) derajat dan sudut keliling ACB = (x + 25) derajat menghadap busur AB yang sama. Besar sudut pusat AOB adalah ... derajat.', '130', 'Sudut pusat = 2 x sudut keliling: 3x + 10 = 2(x + 25), maka x = 40. Sudut pusat = 3(40) + 10 = 130.', '3*40+10'),

  // ---- Bangun Ruang Sisi Datar ----
  G.pg('mudah', 'Banyak rusuk pada sebuah kubus adalah ...', ['6', '8', '12', '16'], 2, 'Kubus memiliki 12 rusuk: 4 di atas, 4 di bawah, dan 4 tegak.'),
  G.pg('mudah', 'Volume kubus dengan panjang rusuk 7 cm adalah ... cm3.', ['49', '294', '21', '343'], 3, 'V = 7 x 7 x 7 = 343.', '7**3'),
  G.pg('sedang', 'Luas permukaan kubus dengan panjang rusuk 5 cm adalah ... cm2.', ['125', '150', '100', '30'], 1, 'LP = 6 x 5^2 = 6 x 25 = 150.', '6*25'),
  G.pg('sedang', 'Volume balok berukuran 12 cm x 6 cm x 5 cm adalah ... cm3.', ['72', '360', '180', '300'], 1, 'V = 12 x 6 x 5 = 360.', '12*6*5'),
  G.pg('sedang', 'Sebuah prisma beralas segitiga siku-siku dengan sisi siku-siku 6 cm dan 8 cm, tinggi prisma 10 cm. Volume prisma adalah ... cm3.', ['480', '120', '240', '140'], 2, 'Luas alas = 1/2 x 6 x 8 = 24. V = 24 x 10 = 240.', '0.5*6*8*10'),
  G.pg('sulit', 'Sebuah limas beralas persegi dengan panjang sisi 12 cm dan tinggi 8 cm. Volume limas adalah ... cm3.', ['1152', '384', '768', '192'], 1, 'V = 1/3 x luas alas x tinggi = 1/3 x 144 x 8 = 384.', '1/3*144*8'),
  G.isi('mudah', 'Luas permukaan balok berukuran 10 cm x 4 cm x 3 cm adalah ... cm2.', '164', 'LP = 2(40 + 30 + 12) = 2 x 82 = 164.', '2*(10*4+10*3+4*3)'),
  G.isi('sedang', 'Jumlah panjang seluruh rusuk sebuah balok berukuran 9 cm x 6 cm x 4 cm adalah ... cm.', '76', '4 x (9 + 6 + 4) = 4 x 19 = 76.', '4*(9+6+4)'),
  G.isi('sedang', 'Akuarium berbentuk balok berukuran 80 cm x 40 cm x 50 cm diisi air hingga 3/4 bagian. Volume air dalam akuarium adalah ... liter. (1 liter = 1.000 cm3)', '120', 'Volume akuarium = 160.000 cm3. Volume air = 3/4 x 160.000 = 120.000 cm3 = 120 liter.', '3/4*80*40*50/1000'),
  G.isi('sulit', 'Volume sebuah kubus 2.744 cm3. Luas permukaan kubus tersebut adalah ... cm2.', '1176', 'Rusuk = akar pangkat tiga dari 2.744 = 14. LP = 6 x 14^2 = 6 x 196 = 1.176.', '6*14*14'),

  // ---- Statistika dan Peluang ----
  H.pg('mudah', 'Rata-rata dari data 4, 6, 8, 10, 12 adalah ...', ['6', '8', '10', '40'], 1, 'Jumlah = 40, banyak data = 5, rata-rata = 8.', '(4+6+8+10+12)/5'),
  H.pg('mudah', 'Median dari data 3, 9, 5, 7, 1 adalah ...', ['7', '3', '5', '9'], 2, 'Urutkan: 1, 3, 5, 7, 9. Nilai tengahnya 5.'),
  H.pg('sedang', 'Modus dari data 2, 3, 3, 4, 5, 5, 5, 6 adalah ...', ['3', '4', '6', '5'], 3, 'Angka 5 muncul paling sering (3 kali).'),
  H.pg('sedang', 'Satu dadu dilempar sekali. Peluang muncul mata dadu genap adalah ...', ['1/6', '1/3', '1/2', '2/3'], 2, 'Mata dadu genap = {2, 4, 6}, jadi peluangnya 3/6 = 1/2.', '3/6'),
  H.pg('sedang', 'Nilai rata-rata 5 siswa adalah 7. Jika seorang siswa bernilai 13 bergabung, rata-rata baru menjadi ...', ['7', '8', '9', '10'], 1, 'Jumlah lama = 35. Jumlah baru = 48, dibagi 6 siswa = 8.', '(35+13)/6'),
  H.pg('sulit', 'Dua dadu dilempar bersamaan. Peluang jumlah kedua mata dadu sama dengan 8 adalah ...', ['1/6', '5/36', '1/9', '7/36'], 1, 'Pasangan yang berjumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 dari 36.', '5/36'),
  H.isi('mudah', 'Rata-rata dari data 7, 9, 10, 12, 17 adalah ...', '11', 'Jumlah = 55, dibagi 5 = 11.', '(7+9+10+12+17)/5'),
  H.isi('sedang', 'Median dari data 12, 15, 9, 20, 18, 10 adalah ...', '13,5', 'Urutkan: 9, 10, 12, 15, 18, 20. Median = (12 + 15) : 2 = 13,5.', '(12+15)/2'),
  H.isi('sedang', 'Sebuah kantong berisi 5 bola merah, 3 bola biru, dan 2 bola hijau. Satu bola diambil secara acak. Peluang terambil bola biru adalah ... (tulis pecahan)', '3/10', 'Banyak bola = 10, bola biru = 3, jadi peluangnya 3/10.', '3/10'),
  H.isi('sulit', 'Nilai rata-rata 8 siswa adalah 72, sedangkan nilai rata-rata 4 siswa lainnya adalah 84. Rata-rata nilai seluruh 12 siswa adalah ...', '76', 'Jumlah = 8 x 72 + 4 x 84 = 576 + 336 = 912. Rata-rata = 912 : 12 = 76.', '(8*72+4*84)/12'),
]
