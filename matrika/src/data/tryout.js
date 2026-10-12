// Paket try out: semua soal isian. "cek" dipakai skrip verifikasi saja.
const paket = (id, kelas, judul, durasiMenit, butir) => ({ id, kelas, judul, durasiMenit, soal: butir.map(([pertanyaan, kunci, pembahasan, cek]) => ({ pertanyaan, kunci, pembahasan, ...(cek ? { cek } : {}) })) })

export const TRYOUT = [
  paket('to-8-1', 8, 'Try Out Kelas 8 - Paket 1', 45, [
    ['Suku ke-12 dari barisan 5, 8, 11, 14, ... adalah ...', '38', 'b = 3. U12 = 5 + 11 x 3 = 38.', '5+11*3'],
    ['Suku ke-6 dari barisan geometri 2, 4, 8, 16, ... adalah ...', '64', 'r = 2. U6 = 2 x 2^5 = 64.', '2*2**5'],
    ['Jika f(x) = 5x - 3, nilai f(-2) adalah ...', '-13', 'f(-2) = 5(-2) - 3 = -13.', '5*(-2)-3'],
    ['Banyak pemetaan yang mungkin dari {a, b, c, d} ke {1, 2} adalah ...', '16', 'Banyaknya = 2^4 = 16.', '2**4'],
    ['Gradien garis yang melalui titik (2, -3) dan (6, 5) adalah ...', '2', 'm = (5 - (-3)) : (6 - 2) = 8 : 4 = 2.', '(5-(-3))/(6-2)'],
    ['Garis y = -2x + 9 memotong sumbu-x di titik (k, 0). Nilai k adalah ...', '4,5', 'Di sumbu-x, y = 0: 2x = 9, jadi x = 4,5.', '9/2'],
    ['Jika x + y = 14 dan x - y = 6, nilai x . y adalah ...', '40', 'x = 10 dan y = 4, jadi xy = 40.', '10*4'],
    ['Harga 4 kue dan 3 minuman Rp36.000, sedangkan harga 2 kue dan 3 minuman Rp24.000. Berapa rupiah harga sebuah kue?', '6000', 'Kurangkan kedua persamaan: 2 kue = Rp12.000, jadi 1 kue = Rp6.000.', '(36000-24000)/2'],
    ['Sisi siku-siku sebuah segitiga siku-siku 15 cm dan 36 cm. Panjang sisi miringnya (cm) adalah ...', '39', '225 + 1.296 = 1.521, dan akar 1.521 = 39.', 'Math.sqrt(225+1296)'],
    ['Panjang diagonal persegi panjang berukuran 15 cm x 20 cm adalah ... cm.', '25', '225 + 400 = 625, dan akar 625 = 25.', 'Math.sqrt(225+400)'],
    ['Keliling lingkaran berdiameter 28 cm (pi = 22/7) adalah ... cm.', '88', 'K = 22/7 x 28 = 88.', '22/7*28'],
    ['Luas juring dengan sudut pusat 60 derajat dan jari-jari 21 cm (pi = 22/7) adalah ... cm2.', '231', 'L lingkaran = 22/7 x 441 = 1.386. Juring = 60/360 x 1.386 = 231.', '60/360*22/7*21*21'],
    ['Volume kubus dengan panjang rusuk 9 cm adalah ... cm3.', '729', 'V = 9^3 = 729.', '9**3'],
    ['Volume limas beralas persegi dengan sisi 9 cm dan tinggi 10 cm adalah ... cm3.', '270', 'V = 1/3 x 81 x 10 = 270.', '1/3*81*10'],
    ['Rata-rata dari data 80, 75, 90, 85, 70 adalah ...', '80', 'Jumlah = 400, dibagi 5 = 80.', '(80+75+90+85+70)/5'],
  ]),
  paket('to-8-2', 8, 'Try Out Kelas 8 - Paket 2', 45, [
    ['Suku ke-15 dari barisan 100, 93, 86, 79, ... adalah ...', '2', 'b = -7. U15 = 100 + 14 x (-7) = 2.', '100-14*7'],
    ['Pada barisan aritmetika, suku ke-3 adalah 11 dan suku ke-7 adalah 27. Suku ke-10 adalah ...', '39', 'b = (27 - 11) : 4 = 4, a = 3. U10 = 3 + 9 x 4 = 39.', '3+9*4'],
    ['Jika f(x) = x^2 + 2x, nilai f(3) adalah ...', '15', 'f(3) = 9 + 6 = 15.', '9+6'],
    ['Fungsi f(x) = ax + b dengan f(0) = 4 dan f(2) = 10. Nilai f(5) adalah ...', '19', 'b = 4. 2a + 4 = 10, jadi a = 3. f(5) = 15 + 4 = 19.', '3*5+4'],
    ['Garis 3x + 4y = 24 memotong sumbu-y di titik (0, k). Nilai k adalah ...', '6', 'x = 0: 4y = 24, jadi y = 6.', '24/4'],
    ['Gradien garis yang tegak lurus dengan garis y = 5x - 1 adalah ...', '-1/5', 'm1 x m2 = -1, jadi m2 = -1/5.', '-1/5'],
    ['Diketahui 3x + y = 11 dan x + y = 5. Nilai 2x + 5y adalah ...', '16', 'Kurangkan: 2x = 6, x = 3, y = 2. Maka 2(3) + 5(2) = 16.', '2*3+5*2'],
    ['Jumlah dua bilangan 48 dan selisihnya 10. Bilangan yang lebih kecil adalah ...', '19', 'Bilangan kecil = (48 - 10) : 2 = 19.', '(48-10)/2'],
    ['Sisi siku-siku sebuah segitiga siku-siku 9 cm dan 40 cm. Panjang sisi miringnya (cm) adalah ...', '41', '81 + 1.600 = 1.681, dan akar 1.681 = 41.', 'Math.sqrt(81+1600)'],
    ['Jarak antara titik (-2, 3) dan (4, 11) adalah ... satuan.', '10', 'Selisih x = 6, selisih y = 8. Jarak = akar 100 = 10.', 'Math.sqrt(36+64)'],
    ['Luas lingkaran berjari-jari 10,5 cm (pi = 22/7) adalah ... cm2.', '346,5', 'L = 22/7 x 10,5 x 10,5 = 346,5.', '22/7*10.5*10.5'],
    ['Panjang busur dengan sudut pusat 120 derajat dan jari-jari 21 cm (pi = 22/7) adalah ... cm.', '44', 'Keliling = 132. Busur = 120/360 x 132 = 44.', '120/360*2*22/7*21'],
    ['Luas permukaan kubus dengan panjang rusuk 6 cm adalah ... cm2.', '216', 'LP = 6 x 36 = 216.', '6*36'],
    ['Volume prisma beralas segitiga siku-siku dengan sisi siku-siku 5 cm dan 12 cm, tinggi prisma 20 cm, adalah ... cm3.', '600', 'Luas alas = 1/2 x 5 x 12 = 30. V = 30 x 20 = 600.', '0.5*5*12*20'],
    ['Dua dadu dilempar bersamaan. Peluang jumlah kedua mata dadu sama dengan 7 adalah ... (pecahan sederhana)', '1/6', 'Ada 6 pasangan berjumlah 7 dari 36 kemungkinan: 6/36 = 1/6.', '6/36'],
  ]),
]
