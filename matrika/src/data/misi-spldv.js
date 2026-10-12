// Soal Misi Kontekstual SPLDV: 36 soal alur (12 slot x 3 versi) + 4 cadangan.
// Kunci sudah diverifikasi dengan scripts/verifikasi.mjs. Jangan mengubah angka tanpa menjalankan skrip itu.
export const SOAL_MISI = [
 {
  "id": "T1-A",
  "pola": "utuh",
  "tingkat": "mudah",
  "judul": "Alat Tulis Ani dan Budi",
  "teks": "Ani membeli 2 buku tulis dan 3 pensil dengan harga Rp19.000. Budi membeli 3 buku tulis dan 1 pensil dengan harga Rp18.000 di toko yang sama. Berapa harga sebuah buku tulis dan sebuah pensil?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga buku tulis",
    "satuan": "Rp"
   },
   {
    "label": "Harga pensil",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "2b + 3p = 19000",
    "3b + p = 18000"
   ],
   "nilai": [
    5000,
    3000
   ],
   "hasil": "buku tulis Rp5.000, pensil Rp3.000"
  },
  "ciri": {
   "konteks": "toko alat tulis",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "2 buku + 3 pensil = 19.000; 3 buku + 1 pensil = 18.000",
   "ditanyakan": "harga buku dan pensil",
   "persamaan": "2b + 3p = 19.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Ada berapa hal yang belum kamu ketahui di soal ini? Beri nama untuk masing-masing.",
   "level2": "Pembelian Ani dan pembelian Budi masing-masing memberi satu hubungan antara jumlah barang dan total harga. Tulis keduanya sebagai persamaan dengan variabel yang sama.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T1-B",
  "pola": "utuh",
  "tingkat": "mudah",
  "judul": "Pesanan di Kantin",
  "teks": "Dina membeli 2 gelas jus dan 1 roti bakar dengan harga Rp21.000. Eko membeli 1 gelas jus dan 3 roti bakar dengan harga Rp23.000 di kantin yang sama. Berapa harga segelas jus dan sebuah roti bakar?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga segelas jus",
    "satuan": "Rp"
   },
   {
    "label": "Harga sebuah roti bakar",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "2j + r = 21000",
    "j + 3r = 23000"
   ],
   "nilai": [
    8000,
    5000
   ],
   "hasil": "jus Rp8.000, roti bakar Rp5.000"
  },
  "ciri": {
   "konteks": "kantin",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Dina: 2 jus + 1 roti = 21.000; Eko: 1 jus + 3 roti = 23.000",
   "ditanyakan": "",
   "persamaan": "2j + r = 21.000; j + 3r = 23.000",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Apa dua besaran yang kamu cari? Tuliskan hubungan untuk pembelian Dina, lalu untuk pembelian Eko.",
   "level2": "Misalkan j harga jus dan r harga roti. Tulis dua persamaan dari kedua pembelian, lalu lihat variabel mana yang paling mudah disamakan koefisiennya.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T1-C",
  "pola": "utuh",
  "tingkat": "mudah",
  "judul": "Toko Buah",
  "teks": "Pak Hasan membeli 3 kg apel dan 2 kg jeruk dengan harga Rp130.000. Bu Mira membeli 2 kg apel dan 4 kg jeruk dengan harga Rp140.000. Berapa harga 1 kg apel dan 1 kg jeruk?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga 1 kg apel",
    "satuan": "Rp"
   },
   {
    "label": "Harga 1 kg jeruk",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "3a + 2j = 130000",
    "2a + 4j = 140000"
   ],
   "nilai": [
    30000,
    20000
   ],
   "hasil": "apel Rp30.000/kg, jeruk Rp20.000/kg"
  },
  "ciri": {
   "konteks": "toko buah",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "3 apel + 2 jeruk = 130.000",
   "ditanyakan": "harga 1 kg apel dan jeruk",
   "persamaan": "",
   "rumus": ""
  },
  "mg": {
   "level1": "Tulis apa yang dibeli Pak Hasan dan berapa yang dibayar. Lalu lakukan hal yang sama untuk Bu Mira.",
   "level2": "Setiap pembelian menjadi satu persamaan. Persamaan kedua bisa disederhanakan jika semua koefisiennya dibagi bilangan yang sama. Coba lihat apakah itu mempermudah.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T1-D",
  "pola": "utuh",
  "tingkat": "mudah",
  "judul": "Koperasi Sekolah",
  "teks": "Rani membeli 4 pulpen dan 2 buku tulis dengan harga Rp18.000. Sari membeli 2 pulpen dan 3 buku tulis dengan harga Rp19.000 di koperasi sekolah. Berapa harga sebuah pulpen dan sebuah buku tulis?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga sebuah pulpen",
    "satuan": "Rp"
   },
   {
    "label": "Harga sebuah buku tulis",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "4p + 2b = 18000",
    "2p + 3b = 19000"
   ],
   "nilai": [
    2000,
    5000
   ],
   "hasil": "pulpen Rp2.000, buku tulis Rp5.000"
  },
  "ciri": {
   "konteks": "koperasi sekolah",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Rani: 4 pulpen + 2 buku = 18.000; Sari: 2 pulpen + 3 buku = 19.000",
   "ditanyakan": "harga pulpen dan buku",
   "persamaan": "4p + 2b = 18.000",
   "rumus": "substitusi"
  },
  "mg": {
   "level1": "Apa yang berbeda antara pembelian Rani dan Sari? Besaran apa yang sama-sama kamu cari?",
   "level2": "Coba kalikan salah satu persamaan agar koefisien satu variabel sama dengan persamaan lainnya, lalu kurangkan.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T2-A",
  "pola": "kontras",
  "tingkat": "mudah",
  "judul": "Mangga dan Jambu (satu pembeli)",
  "teks": "Bu Sinta membeli 2 kg mangga dan 3 kg jambu dengan harga Rp70.000. (a) Apakah informasi ini cukup untuk menentukan harga tepat 1 kg mangga dan 1 kg jambu? (b) Jika tidak, tuliskan dua pasangan harga yang mungkin.",
  "konsep": "bukan-SPLDV",
  "jawabTipe": "dua-pasang",
  "alasan": "satu-persamaan",
  "jawab": [
   {
    "label": "Pasangan 1: harga mangga",
    "satuan": "Rp"
   },
   {
    "label": "Pasangan 1: harga jambu",
    "satuan": "Rp"
   },
   {
    "label": "Pasangan 2: harga mangga",
    "satuan": "Rp"
   },
   {
    "label": "Pasangan 2: harga jambu",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "2m + 3j = 70000"
   ],
   "model": [
    2,
    3,
    70000
   ],
   "contohPasangan": [
    20000,
    10000,
    5000,
    20000
   ],
   "hasil": "tidak ada jawaban tunggal; contoh (20.000; 10.000) dan (5.000; 20.000)"
  },
  "ciri": {
   "konteks": "pasar buah",
   "representasi": "teks",
   "struktur": "satu persamaan"
  },
  "aspekKritis": [
   "Pada soal ini aspek kritis SPLDV tidak terpenuhi sepenuhnya (itulah kontrasnya)"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "2 kg mangga + 3 kg jambu = 70.000",
   "ditanyakan": "harga mangga dan jambu",
   "persamaan": "2m + 3j = 70.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Berapa persamaan yang bisa kamu tulis dari cerita ini, dan berapa hal yang belum diketahui? Apakah itu cukup?",
   "level2": "Coba pilih sendiri satu harga mangga, lalu hitung harga jambunya. Apakah selalu hanya ada satu kemungkinan?",
   "level3": "contoh-2a"
  }
 },
 {
  "id": "T2-B",
  "pola": "kontras",
  "tingkat": "mudah",
  "judul": "Mangga dan Jambu (dua pembeli)",
  "teks": "Pak Ali membeli 2 kg mangga dan 3 kg jambu dengan harga Rp70.000. Bu Rina membeli 1 kg mangga dan 2 kg jambu dengan harga Rp40.000. Tentukan harga 1 kg mangga dan 1 kg jambu.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga 1 kg mangga",
    "satuan": "Rp"
   },
   {
    "label": "Harga 1 kg jambu",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "2m + 3j = 70000",
    "m + 2j = 40000"
   ],
   "nilai": [
    20000,
    10000
   ],
   "hasil": "mangga Rp20.000, jambu Rp10.000"
  },
  "ciri": {
   "konteks": "pasar buah",
   "representasi": "teks",
   "struktur": "dua persamaan"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "Pak Ali: 2 mangga + 3 jambu = 70.000; Bu Rina: 1 mangga + 2 jambu = 40.000",
   "ditanyakan": "harga mangga dan jambu",
   "persamaan": "2m + 3j = 70.000; m + 2j = 40.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Bandingkan dengan cerita Bu Sinta. Informasi apa yang bertambah di soal ini?",
   "level2": "Kamu sekarang punya dua hubungan. Tulis keduanya sebagai persamaan dengan m dan j, lalu cari pasangan nilai yang memenuhi keduanya sekaligus.",
   "level3": "contoh-2b"
  }
 },
 {
  "id": "T2-C",
  "pola": "kontras",
  "tingkat": "mudah",
  "judul": "Dua Bilangan, Hasil Kali",
  "teks": "Dua bilangan bulat positif x dan y memenuhi: jumlahnya 10 dan hasil kalinya 24. Apakah sistem persamaan ini termasuk SPLDV? Jelaskan alasanmu.",
  "konsep": "bukan-SPLDV",
  "jawabTipe": "pernyataan",
  "alasan": "tidak-linear",
  "jawab": [],
  "kunci": {
   "persamaan": [
    "x + y = 10",
    "x * y = 24"
   ],
   "pasangan": [
    [
     4,
     6
    ],
    [
     6,
     4
    ]
   ],
   "hasil": "bukan SPLDV karena persamaan kedua memuat perkalian dua variabel (tidak linear); nilainya 4 dan 6"
  },
  "ciri": {
   "konteks": "bilangan",
   "representasi": "teks",
   "struktur": "dua persamaan, satu tidak linear"
  },
  "aspekKritis": [
   "Pada soal ini aspek kritis SPLDV tidak terpenuhi sepenuhnya (itulah kontrasnya)"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "x + y = 10; x · y = 24",
   "ditanyakan": "apakah SPLDV?",
   "persamaan": "x + y = 10",
   "rumus": ""
  },
  "mg": {
   "level1": "Tulis kedua kalimat soal sebagai persamaan. Perhatikan bentuk masing-masing: apakah variabelnya hanya dijumlahkan atau dikurangkan?",
   "level2": "Pada SPLDV, setiap variabel berpangkat satu dan tidak dikalikan dengan variabel lain. Periksa kedua persamaanmu dengan ciri itu.",
   "level3": "contoh-2c"
  }
 },
 {
  "id": "T2-D",
  "pola": "kontras",
  "tingkat": "mudah",
  "judul": "Dua Bilangan, Jumlah dan Selisih",
  "teks": "Jumlah dua bilangan adalah 25 dan selisihnya 7. Tentukan kedua bilangan tersebut.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Bilangan yang lebih besar",
    "satuan": ""
   },
   {
    "label": "Bilangan yang lebih kecil",
    "satuan": ""
   }
  ],
  "kunci": {
   "persamaan": [
    "x + y = 25",
    "x - y = 7"
   ],
   "nilai": [
    16,
    9
   ],
   "hasil": "16 dan 9"
  },
  "ciri": {
   "konteks": "bilangan",
   "representasi": "teks",
   "struktur": "dua persamaan implisit dari kata jumlah dan selisih"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "jumlah = 25; selisih = 7",
   "ditanyakan": "dua bilangan",
   "persamaan": "",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Dua hal apa yang belum kamu ketahui? Ubah kata 'jumlah' dan 'selisih' menjadi dua persamaan.",
   "level2": "Misalkan bilangan pertama x dan kedua y, dengan x lebih besar. Coba jumlahkan kedua persamaan, apa yang terjadi pada salah satu variabel?",
   "level3": "contoh-2b"
  }
 },
 {
  "id": "T3-A",
  "pola": "generalisasi",
  "tingkat": "mudah",
  "judul": "Tarif Parkir",
  "teks": "Tarif parkir di sebuah mal berbeda untuk motor dan mobil. Pada pagi hari, 4 motor dan 2 mobil membayar total Rp18.000. Pada siang hari, 2 motor dan 3 mobil membayar total Rp19.000. Tentukan tarif parkir satu motor dan satu mobil.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Tarif satu motor",
    "satuan": "Rp"
   },
   {
    "label": "Tarif satu mobil",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "4m + 2c = 18000",
    "2m + 3c = 19000"
   ],
   "nilai": [
    2000,
    5000
   ],
   "hasil": "motor Rp2.000, mobil Rp5.000"
  },
  "ciri": {
   "konteks": "tempat parkir",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "pagi: 4 motor + 2 mobil = 18.000; siang: 2 motor + 3 mobil = 19.000",
   "ditanyakan": "tarif motor dan mobil",
   "persamaan": "4m + 2c = 18.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Apa yang berbeda dari soal jual beli sebelumnya, dan apa yang tetap sama? Berapa besaran yang kamu cari?",
   "level2": "Pagi dan siang memberi dua hubungan antara jumlah kendaraan dan total bayar. Misalkan m tarif motor dan c tarif mobil, lalu tulis keduanya.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T3-B",
  "pola": "generalisasi",
  "tingkat": "mudah",
  "judul": "Pesanan Kantin (tabel)",
  "teks": "Tabel berikut mencatat pesanan dua pelanggan kantin. Tentukan harga seporsi nasi goreng dan segelas es teh.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "tabel",
   "kolom": [
    "Hari",
    "Nasi goreng",
    "Es teh",
    "Total bayar"
   ],
   "baris": [
    [
     "Senin",
     "2",
     "3",
     "Rp29.000"
    ],
    [
     "Selasa",
     "3",
     "2",
     "Rp36.000"
    ]
   ]
  },
  "jawab": [
   {
    "label": "Harga seporsi nasi goreng",
    "satuan": "Rp"
   },
   {
    "label": "Harga segelas es teh",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "2n + 3t = 29000",
    "3n + 2t = 36000"
   ],
   "nilai": [
    10000,
    3000
   ],
   "hasil": "nasi goreng Rp10.000, es teh Rp3.000"
  },
  "ciri": {
   "konteks": "kantin",
   "representasi": "tabel",
   "struktur": "dua persamaan dari dua baris tabel"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "Senin: 2 nasi goreng, 3 es teh = 29.000",
   "ditanyakan": "harga nasi goreng dan es teh",
   "persamaan": "",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Tabel ini menyimpan dua cerita. Baca satu baris sebagai satu kalimat: berapa yang dibeli dan berapa dibayar?",
   "level2": "Setiap baris tabel adalah satu persamaan. Ubah baris Senin dan baris Selasa menjadi persamaan dengan variabel yang sama.",
   "level3": "contoh-3"
  }
 },
 {
  "id": "T3-C",
  "pola": "generalisasi",
  "tingkat": "mudah",
  "judul": "Timbangan Seimbang",
  "teks": "Perhatikan kedua timbangan yang seimbang pada diagram berikut. Tentukan massa 1 semangka dan 1 melon.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "timbangan",
   "set": [
    {
     "kiri": [
      [
       "semangka",
       2
      ],
      [
       "melon",
       1
      ]
     ],
     "kanan": "7 kg"
    },
    {
     "kiri": [
      [
       "semangka",
       1
      ],
      [
       "melon",
       2
      ]
     ],
     "kanan": "5 kg"
    }
   ],
   "besar": "semangka",
   "kecil": "melon"
  },
  "jawab": [
   {
    "label": "Massa 1 semangka",
    "satuan": "kg"
   },
   {
    "label": "Massa 1 melon",
    "satuan": "kg"
   }
  ],
  "kunci": {
   "persamaan": [
    "2s + m = 7",
    "s + 2m = 5"
   ],
   "nilai": [
    3,
    1
   ],
   "hasil": "semangka 3 kg, melon 1 kg"
  },
  "ciri": {
   "konteks": "buah dan timbangan",
   "representasi": "diagram",
   "struktur": "dua persamaan dari dua kondisi seimbang"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "2 semangka + 1 melon = 7 kg",
   "ditanyakan": "massa semangka dan melon",
   "persamaan": "2s + m = 7",
   "rumus": ""
  },
  "mg": {
   "level1": "Timbangan seimbang berarti kedua sisinya sama berat. Apa yang bisa kamu tulis dari setiap timbangan?",
   "level2": "Misalkan s massa semangka dan m massa melon. Tiap timbangan menjadi satu persamaan; pilih variabel yang mau dihilangkan lebih dulu.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T3-D",
  "pola": "generalisasi",
  "tingkat": "mudah",
  "judul": "Koin Permainan (grafik)",
  "teks": "Dalam sebuah permainan, Tia mengumpulkan x koin emas dan y koin perak. Grafik menunjukkan dua petunjuk: Petunjuk 1 (garis hijau) melalui titik (7, 0) dan (0, 14). Petunjuk 2 (garis biru) melalui titik (9, 0) dan (0, 9). Tentukan persamaan tiap garis dan banyak koin emas serta koin perak yang dikumpulkan Tia.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "grafik",
   "maks": 14,
   "sumbuX": "x (koin emas)",
   "sumbuY": "y (koin perak)",
   "garis": [
    {
     "warna": "hijau",
     "label": "Petunjuk 1",
     "titik": [
      [
       7,
       0
      ],
      [
       0,
       14
      ]
     ]
    },
    {
     "warna": "biru",
     "label": "Petunjuk 2",
     "titik": [
      [
       9,
       0
      ],
      [
       0,
       9
      ]
     ]
    }
   ]
  },
  "jawab": [
   {
    "label": "Banyak koin emas",
    "satuan": ""
   },
   {
    "label": "Banyak koin perak",
    "satuan": ""
   }
  ],
  "kunci": {
   "persamaan": [
    "2x + y = 14",
    "x + y = 9"
   ],
   "nilai": [
    5,
    4
   ],
   "hasil": "koin emas 5, koin perak 4 (titik potong (5, 4))"
  },
  "ciri": {
   "konteks": "permainan",
   "representasi": "grafik",
   "struktur": "dua persamaan dari titik pada garis"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "garis 1 melalui (7,0) dan (0,14); garis 2 melalui (9,0) dan (0,9)",
   "ditanyakan": "koin emas dan perak",
   "persamaan": "x + y = 9",
   "rumus": "grafik"
  },
  "mg": {
   "level1": "Titik potong kedua garis memenuhi kedua persamaan sekaligus. Dari titik-titik yang tertera, persamaan apa yang cocok untuk tiap garis?",
   "level2": "Garis 1 melalui (7, 0) dan (0, 14). Coba cari persamaan ax + by = c yang dipenuhi kedua titik itu, lalu lakukan hal yang sama untuk garis 2.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T4-A",
  "pola": "fusi",
  "tingkat": "mudah",
  "judul": "Keliling dan Luas Persegi Panjang",
  "teks": "Keliling sebuah persegi panjang adalah 48 cm. Panjangnya 4 cm lebih dari lebarnya. Tentukan luas persegi panjang tersebut.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Luas persegi panjang",
    "satuan": "cm²"
   }
  ],
  "kunci": {
   "persamaan": [
    "2(p + l) = 48",
    "p = l + 4"
   ],
   "var": [
    14,
    10
   ],
   "nilai": [
    140
   ],
   "hasil": "p = 14 cm, l = 10 cm, luas 140 cm²"
  },
  "ciri": {
   "konteks": "geometri",
   "representasi": "teks",
   "struktur": "persamaan implisit dari rumus keliling"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "keliling = 48; p = l + 4",
   "ditanyakan": "luas",
   "persamaan": "p + l = 24",
   "rumus": "K = 2(p + l)"
  },
  "mg": {
   "level1": "Rumus keliling persegi panjang apa yang kamu butuhkan? Besaran apa saja yang belum diketahui?",
   "level2": "Keliling 48 memberi hubungan antara p dan l; kalimat 'panjangnya 4 cm lebih dari lebarnya' memberi hubungan kedua. Tulis keduanya, selesaikan, baru hitung luas.",
   "level3": "contoh-4"
  }
 },
 {
  "id": "T4-B",
  "pola": "fusi",
  "tingkat": "mudah",
  "judul": "Keliling Segitiga Sama Kaki",
  "teks": "Keliling sebuah segitiga sama kaki adalah 32 cm. Alasnya 2 cm lebih panjang dari panjang kakinya. Tentukan panjang kaki dan panjang alas segitiga tersebut.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Panjang kaki",
    "satuan": "cm"
   },
   {
    "label": "Panjang alas",
    "satuan": "cm"
   }
  ],
  "kunci": {
   "persamaan": [
    "2k + a = 32",
    "a = k + 2"
   ],
   "nilai": [
    10,
    12
   ],
   "hasil": "kaki 10 cm, alas 12 cm"
  },
  "ciri": {
   "konteks": "geometri",
   "representasi": "teks",
   "struktur": "persamaan implisit dari sifat segitiga sama kaki"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "keliling = 32; alas = kaki + 2",
   "ditanyakan": "panjang kaki dan alas",
   "persamaan": "",
   "rumus": "keliling = 2k + a"
  },
  "mg": {
   "level1": "Segitiga sama kaki punya dua sisi yang sama panjang. Dari ciri itu, bagaimana kamu menyatakan keliling dengan dua variabel?",
   "level2": "Misalkan k panjang kaki dan a panjang alas. Tulis keliling sebagai persamaan pertama, dan kalimat tentang alas sebagai persamaan kedua.",
   "level3": "contoh-4"
  }
 },
 {
  "id": "T4-C",
  "pola": "fusi",
  "tingkat": "mudah",
  "judul": "Roda di Tempat Parkir",
  "teks": "Di sebuah tempat parkir terdapat 30 kendaraan berupa sepeda motor dan mobil. Jumlah seluruh roda kendaraan tersebut 76 (tidak termasuk ban serep). Berapa banyak sepeda motor dan mobil?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Banyak sepeda motor",
    "satuan": ""
   },
   {
    "label": "Banyak mobil",
    "satuan": ""
   }
  ],
  "kunci": {
   "persamaan": [
    "m + c = 30",
    "2m + 4c = 76"
   ],
   "nilai": [
    22,
    8
   ],
   "hasil": "sepeda motor 22, mobil 8"
  },
  "ciri": {
   "konteks": "tempat parkir",
   "representasi": "teks",
   "struktur": "persamaan kedua implisit dari jumlah roda per kendaraan"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "30 kendaraan; 76 roda",
   "ditanyakan": "banyak motor dan mobil",
   "persamaan": "m + c = 30",
   "rumus": ""
  },
  "mg": {
   "level1": "Soal tidak menyebut persamaan, tapi ada dua jumlah yang diketahui. Apa saja? Berapa roda satu motor dan satu mobil?",
   "level2": "Satu persamaan untuk jumlah kendaraan, satu untuk jumlah roda. Tulis keduanya dengan m dan c.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "T4-D",
  "pola": "fusi",
  "tingkat": "mudah",
  "judul": "Ayam dan Kambing",
  "teks": "Di sebuah peternakan terdapat ayam dan kambing sebanyak 40 ekor. Jumlah seluruh kaki hewan tersebut 110. Berapa ekor ayam dan berapa ekor kambing?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Banyak ayam",
    "satuan": "ekor"
   },
   {
    "label": "Banyak kambing",
    "satuan": "ekor"
   }
  ],
  "kunci": {
   "persamaan": [
    "a + k = 40",
    "2a + 4k = 110"
   ],
   "nilai": [
    25,
    15
   ],
   "hasil": "ayam 25 ekor, kambing 15 ekor"
  },
  "ciri": {
   "konteks": "peternakan",
   "representasi": "teks",
   "struktur": "persamaan kedua implisit dari jumlah kaki per hewan"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "40 ekor; 110 kaki",
   "ditanyakan": "banyak ayam dan kambing",
   "persamaan": "",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Berapa kaki seekor ayam dan seekor kambing? Dari situ, apa dua hal yang bisa kamu tulis sebagai persamaan?",
   "level2": "Satu persamaan untuk jumlah hewan, satu untuk jumlah kaki. Coba kalikan persamaan pertama dengan 2, lalu bandingkan dengan persamaan kedua.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "S1-A",
  "pola": "utuh",
  "tingkat": "sedang",
  "judul": "Toko Sembako",
  "teks": "Bu Ani membeli 3 kg beras dan 2 kg gula seharga Rp62.000. Bu Lina membeli 2 kg beras dan 5 kg gula seharga Rp78.000 di toko sembako yang sama. Berapa harga 1 kg beras dan 1 kg gula?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga 1 kg beras",
    "satuan": "Rp"
   },
   {
    "label": "Harga 1 kg gula",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "3b + 2g = 62000",
    "2b + 5g = 78000"
   ],
   "nilai": [
    14000,
    10000
   ],
   "hasil": "beras Rp14.000, gula Rp10.000"
  },
  "ciri": {
   "konteks": "toko sembako",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Bu Ani: 3 beras + 2 gula = 62.000; Bu Lina: 2 beras + 5 gula = 78.000",
   "ditanyakan": "harga 1 kg beras dan gula",
   "persamaan": "3b + 2g = 62.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Apa dua besaran yang kamu cari? Tuliskan apa yang dibeli Bu Ani dan berapa yang ia bayar, lalu lakukan hal yang sama untuk Bu Lina.",
   "level2": "Misalkan b harga 1 kg beras dan g harga 1 kg gula. Dua pembelian itu menjadi dua persamaan. Pilih variabel yang paling mudah disamakan koefisiennya.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "S1-B",
  "pola": "utuh",
  "tingkat": "sedang",
  "judul": "Toko Kue",
  "teks": "Dito membeli 5 donat dan 3 roti seharga Rp41.000. Evi membeli 3 donat dan 4 roti seharga Rp40.000 di toko kue yang sama. Berapa harga sebuah donat dan sebuah roti?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga sebuah donat",
    "satuan": "Rp"
   },
   {
    "label": "Harga sebuah roti",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "5d + 3r = 41000",
    "3d + 4r = 40000"
   ],
   "nilai": [
    4000,
    7000
   ],
   "hasil": "donat Rp4.000, roti Rp7.000"
  },
  "ciri": {
   "konteks": "toko kue",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "5 donat + 3 roti = 41.000",
   "ditanyakan": "",
   "persamaan": "5d + 3r = 41.000",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Apa yang berbeda antara pembelian Dito dan Evi, dan apa yang sama-sama kamu cari?",
   "level2": "Tulis dua persamaan dengan d dan r. Kalikan agar koefisien salah satu variabel sama, lalu kurangkan.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "S1-C",
  "pola": "utuh",
  "tingkat": "sedang",
  "judul": "Pasar Malam",
  "teks": "Rafi membeli 4 tiket komidi putar dan 3 tiket bianglala seharga Rp85.000. Salsa membeli 3 tiket komidi putar dan 5 tiket bianglala seharga Rp105.000 di pasar malam. Berapa harga satu tiket komidi putar dan satu tiket bianglala?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga tiket komidi putar",
    "satuan": "Rp"
   },
   {
    "label": "Harga tiket bianglala",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "4k + 3b = 85000",
    "3k + 5b = 105000"
   ],
   "nilai": [
    10000,
    15000
   ],
   "hasil": "komidi putar Rp10.000, bianglala Rp15.000"
  },
  "ciri": {
   "konteks": "pasar malam",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Rafi: 4 komidi + 3 bianglala = 85.000",
   "ditanyakan": "harga tiket komidi putar dan bianglala",
   "persamaan": "",
   "rumus": "substitusi"
  },
  "mg": {
   "level1": "Tiap orang membeli dua jenis tiket. Tulis hubungan jumlah tiket dan total bayar untuk Rafi, lalu untuk Salsa.",
   "level2": "Misalkan k harga tiket komidi putar dan b harga tiket bianglala. Setiap pembelian menjadi satu persamaan; cari cara menyamakan salah satu koefisien.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "S2-A",
  "pola": "kontras",
  "tingkat": "sedang",
  "judul": "Telur dan Daging Ayam (satu pembeli)",
  "teks": "Pak Tono membeli 3 kg telur dan 2 kg daging ayam seharga Rp150.000. (a) Apakah informasi ini cukup untuk menentukan harga tepat 1 kg telur dan 1 kg daging ayam? (b) Jika tidak, tuliskan dua pasangan harga yang mungkin.",
  "konsep": "bukan-SPLDV",
  "jawabTipe": "dua-pasang",
  "alasan": "satu-persamaan",
  "jawab": [
   {
    "label": "Pasangan 1: harga telur",
    "satuan": "Rp"
   },
   {
    "label": "Pasangan 1: harga daging ayam",
    "satuan": "Rp"
   },
   {
    "label": "Pasangan 2: harga telur",
    "satuan": "Rp"
   },
   {
    "label": "Pasangan 2: harga daging ayam",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "3e + 2d = 150000"
   ],
   "model": [
    3,
    2,
    150000
   ],
   "contohPasangan": [
    20000,
    45000,
    30000,
    30000
   ],
   "hasil": "tidak ada jawaban tunggal; contoh (20.000; 45.000) dan (30.000; 30.000)"
  },
  "ciri": {
   "konteks": "pasar",
   "representasi": "teks",
   "struktur": "satu persamaan"
  },
  "aspekKritis": [
   "Pada soal ini aspek kritis SPLDV tidak terpenuhi sepenuhnya (itulah kontrasnya)"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "3 kg telur + 2 kg daging ayam = 150.000",
   "ditanyakan": "harga telur dan daging ayam",
   "persamaan": "3e + 2d = 150.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Berapa persamaan yang bisa kamu tulis dari cerita ini, dan berapa hal yang belum diketahui? Apakah itu cukup untuk satu jawaban?",
   "level2": "Pilih sendiri satu harga telur, lalu hitung harga daging ayamnya. Apakah selalu hanya ada satu kemungkinan?",
   "level3": "contoh-2a"
  }
 },
 {
  "id": "S2-B",
  "pola": "kontras",
  "tingkat": "sedang",
  "judul": "Telur dan Daging Ayam (dua pembeli)",
  "teks": "Pak Tono membeli 3 kg telur dan 2 kg daging ayam seharga Rp150.000. Bu Wati membeli 2 kg telur dan 1 kg daging ayam seharga Rp85.000 di toko yang sama. Tentukan harga 1 kg telur dan 1 kg daging ayam.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga 1 kg telur",
    "satuan": "Rp"
   },
   {
    "label": "Harga 1 kg daging ayam",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "3e + 2d = 150000",
    "2e + d = 85000"
   ],
   "nilai": [
    20000,
    45000
   ],
   "hasil": "telur Rp20.000, daging ayam Rp45.000"
  },
  "ciri": {
   "konteks": "pasar",
   "representasi": "teks",
   "struktur": "dua persamaan"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "Pak Tono: 3 telur + 2 daging = 150.000; Bu Wati: 2 telur + 1 daging = 85.000",
   "ditanyakan": "harga telur dan daging ayam",
   "persamaan": "3e + 2d = 150.000; 2e + d = 85.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Bandingkan dengan cerita Pak Tono saja. Informasi apa yang bertambah di soal ini?",
   "level2": "Sekarang ada dua hubungan. Tulis keduanya dengan e dan d, lalu cari pasangan nilai yang cocok untuk keduanya.",
   "level3": "contoh-2b"
  }
 },
 {
  "id": "S2-C",
  "pola": "kontras",
  "tingkat": "sedang",
  "judul": "Luas dan Keliling Persegi Panjang",
  "teks": "Sebuah persegi panjang memiliki luas 48 cm² dan keliling 28 cm. Misalkan panjangnya p dan lebarnya l. Apakah sistem persamaan dari informasi ini termasuk SPLDV? Jelaskan alasanmu.",
  "konsep": "bukan-SPLDV",
  "jawabTipe": "pernyataan",
  "alasan": "tidak-linear",
  "jawab": [],
  "kunci": {
   "persamaan": [
    "p * l = 48",
    "2(p + l) = 28"
   ],
   "pasangan": [
    [
     8,
     6
    ],
    [
     6,
     8
    ]
   ],
   "hasil": "bukan SPLDV karena persamaan luas memuat perkalian dua variabel (tidak linear); nilainya 8 dan 6"
  },
  "ciri": {
   "konteks": "geometri",
   "representasi": "teks",
   "struktur": "dua persamaan, satu tidak linear"
  },
  "aspekKritis": [
   "Pada soal ini aspek kritis SPLDV tidak terpenuhi sepenuhnya (itulah kontrasnya)"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "luas = 48; keliling = 28",
   "ditanyakan": "apakah SPLDV?",
   "persamaan": "p x l = 48",
   "rumus": ""
  },
  "mg": {
   "level1": "Tulis informasi luas dan keliling sebagai persamaan. Perhatikan persamaan yang memuat luas: apakah variabelnya hanya dijumlahkan?",
   "level2": "Pada SPLDV tiap variabel berpangkat satu dan tidak dikalikan variabel lain. Periksa kedua persamaanmu dengan ciri itu.",
   "level3": "contoh-2c"
  }
 },
 {
  "id": "S3-A",
  "pola": "generalisasi",
  "tingkat": "sedang",
  "judul": "Tiket Bioskop (tabel)",
  "teks": "Tabel berikut mencatat pembelian tiket bioskop dua hari. Tentukan harga satu tiket dewasa dan satu tiket anak.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "tabel",
   "kolom": [
    "Hari",
    "Tiket dewasa",
    "Tiket anak",
    "Total bayar"
   ],
   "baris": [
    [
     "Sabtu",
     "3",
     "2",
     "Rp210.000"
    ],
    [
     "Minggu",
     "2",
     "4",
     "Rp220.000"
    ]
   ]
  },
  "jawab": [
   {
    "label": "Harga tiket dewasa",
    "satuan": "Rp"
   },
   {
    "label": "Harga tiket anak",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "3a + 2c = 210000",
    "2a + 4c = 220000"
   ],
   "nilai": [
    50000,
    30000
   ],
   "hasil": "dewasa Rp50.000, anak Rp30.000"
  },
  "ciri": {
   "konteks": "bioskop",
   "representasi": "tabel",
   "struktur": "dua persamaan dari dua baris tabel"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "Sabtu: 3 dewasa, 2 anak = 210.000",
   "ditanyakan": "harga tiket dewasa dan anak",
   "persamaan": "",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Baca satu baris tabel sebagai satu kalimat: berapa tiket yang dibeli dan berapa yang dibayar?",
   "level2": "Tiap baris adalah satu persamaan. Ubah baris Sabtu dan Minggu menjadi persamaan dengan variabel yang sama.",
   "level3": "contoh-3"
  }
 },
 {
  "id": "S3-B",
  "pola": "generalisasi",
  "tingkat": "sedang",
  "judul": "Timbangan Apel dan Jeruk",
  "teks": "Perhatikan kedua timbangan yang seimbang pada diagram berikut. Tentukan massa satu apel dan satu jeruk.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "timbangan",
   "set": [
    {
     "kiri": [
      [
       "apel",
       3
      ],
      [
       "jeruk",
       2
      ]
     ],
     "kanan": "1.100 g"
    },
    {
     "kiri": [
      [
       "apel",
       2
      ],
      [
       "jeruk",
       3
      ]
     ],
     "kanan": "1.150 g"
    }
   ],
   "besar": "apel",
   "kecil": "jeruk"
  },
  "jawab": [
   {
    "label": "Massa satu apel",
    "satuan": "g"
   },
   {
    "label": "Massa satu jeruk",
    "satuan": "g"
   }
  ],
  "kunci": {
   "persamaan": [
    "3a + 2j = 1100",
    "2a + 3j = 1150"
   ],
   "nilai": [
    200,
    250
   ],
   "hasil": "apel 200 g, jeruk 250 g"
  },
  "ciri": {
   "konteks": "buah dan timbangan",
   "representasi": "diagram",
   "struktur": "dua persamaan dari dua kondisi seimbang"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "3 apel + 2 jeruk = 1.100 g",
   "ditanyakan": "massa apel dan jeruk",
   "persamaan": "3a + 2j = 1.100",
   "rumus": ""
  },
  "mg": {
   "level1": "Timbangan seimbang berarti kedua sisinya sama berat. Apa yang bisa kamu tulis dari setiap timbangan?",
   "level2": "Misalkan a massa apel dan j massa jeruk. Tiap timbangan menjadi satu persamaan; pilih variabel yang ingin kamu hilangkan lebih dulu.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "S3-C",
  "pola": "generalisasi",
  "tingkat": "sedang",
  "judul": "Stiker Permainan (grafik)",
  "teks": "Mira mengumpulkan x stiker bintang dan y stiker bulan. Dua petunjuk digambarkan oleh garis hijau dan garis biru pada grafik. Tentukan persamaan tiap garis dan banyak stiker bintang dan bulan yang dikumpulkan Mira.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "grafik",
   "maks": 12,
   "sumbuX": "x (stiker bintang)",
   "sumbuY": "y (stiker bulan)",
   "garis": [
    {
     "warna": "hijau",
     "label": "Petunjuk hijau",
     "titik": [
      [
       10,
       0
      ],
      [
       0,
       10
      ]
     ]
    },
    {
     "warna": "biru",
     "label": "Petunjuk biru",
     "titik": [
      [
       6,
       0
      ],
      [
       0,
       12
      ]
     ]
    }
   ]
  },
  "jawab": [
   {
    "label": "Banyak stiker bintang",
    "satuan": ""
   },
   {
    "label": "Banyak stiker bulan",
    "satuan": ""
   }
  ],
  "kunci": {
   "persamaan": [
    "x + y = 10",
    "2x + y = 12"
   ],
   "nilai": [
    2,
    8
   ],
   "hasil": "bintang 2, bulan 8"
  },
  "ciri": {
   "konteks": "permainan stiker",
   "representasi": "grafik",
   "struktur": "dua persamaan dari titik pada garis"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "garis hijau melalui (10,0) dan (0,10); garis biru melalui (6,0) dan (0,12)",
   "ditanyakan": "stiker bintang dan bulan",
   "persamaan": "",
   "rumus": "grafik"
  },
  "mg": {
   "level1": "Titik potong kedua garis memenuhi kedua persamaan. Dari titik-titik yang tertera pada tiap garis, persamaan apa yang cocok?",
   "level2": "Garis hijau melalui (10, 0) dan (0, 10). Cari persamaan ax + by = c yang dipenuhi kedua titik itu, lalu lakukan hal yang sama untuk garis biru.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "S4-A",
  "pola": "fusi",
  "tingkat": "sedang",
  "judul": "Sudut Segitiga Siku-siku",
  "teks": "Dalam segitiga siku-siku ABC dengan siku-siku di C, selisih besar sudut A dan sudut B adalah 20 derajat dan sudut A lebih besar dari sudut B. Tentukan besar sudut A dan sudut B.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Besar sudut A",
    "satuan": "derajat"
   },
   {
    "label": "Besar sudut B",
    "satuan": "derajat"
   }
  ],
  "kunci": {
   "persamaan": [
    "A + B = 90",
    "A - B = 20"
   ],
   "nilai": [
    55,
    35
   ],
   "hasil": "A = 55 derajat, B = 35 derajat"
  },
  "ciri": {
   "konteks": "geometri",
   "representasi": "teks",
   "struktur": "persamaan implisit dari sifat segitiga siku-siku"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "siku-siku di C; selisih A dan B = 20",
   "ditanyakan": "besar sudut A dan B",
   "persamaan": "A - B = 20",
   "rumus": "jumlah sudut segitiga = 180"
  },
  "mg": {
   "level1": "Apa yang kamu ketahui tentang jumlah ketiga sudut segitiga? Sudut siku-siku besarnya berapa?",
   "level2": "Sudut A dan B bersama-sama membentuk sisa dari jumlah sudut segitiga. Tulis itu sebagai persamaan pertama, dan 'selisih 20 derajat' sebagai persamaan kedua.",
   "level3": "contoh-4"
  }
 },
 {
  "id": "S4-B",
  "pola": "fusi",
  "tingkat": "sedang",
  "judul": "Celengan Dika",
  "teks": "Di dalam celengan Dika terdapat 30 keping uang logam pecahan Rp500 dan Rp1.000. Jika seluruh uang logam itu bernilai Rp22.000, berapa keping masing-masing pecahan?",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Banyak keping Rp500",
    "satuan": "keping"
   },
   {
    "label": "Banyak keping Rp1.000",
    "satuan": "keping"
   }
  ],
  "kunci": {
   "persamaan": [
    "a + b = 30",
    "500a + 1000b = 22000"
   ],
   "nilai": [
    16,
    14
   ],
   "hasil": "16 keping Rp500 dan 14 keping Rp1.000"
  },
  "ciri": {
   "konteks": "uang",
   "representasi": "teks",
   "struktur": "persamaan kedua implisit dari nilai pecahan"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "30 keping; total Rp22.000",
   "ditanyakan": "banyak keping tiap pecahan",
   "persamaan": "a + b = 30",
   "rumus": ""
  },
  "mg": {
   "level1": "Soal tidak menyebut persamaan, tapi ada dua jumlah yang diketahui. Apa saja? Berapa nilai tiap keping?",
   "level2": "Satu persamaan untuk banyak keping, satu untuk nilai uang. Tulis keduanya dengan a dan b.",
   "level3": "contoh-5"
  }
 },
 {
  "id": "S4-C",
  "pola": "fusi",
  "tingkat": "sedang",
  "judul": "Umur Ayah dan Doni",
  "teks": "Umur Ayah sekarang 5 kali umur Doni. Empat tahun lagi, jumlah umur mereka 62 tahun. Tentukan umur Ayah dan Doni sekarang.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Umur Ayah",
    "satuan": "tahun"
   },
   {
    "label": "Umur Doni",
    "satuan": "tahun"
   }
  ],
  "kunci": {
   "persamaan": [
    "a = 5d",
    "(a + 4) + (d + 4) = 62"
   ],
   "nilai": [
    45,
    9
   ],
   "hasil": "Ayah 45 tahun, Doni 9 tahun"
  },
  "ciri": {
   "konteks": "umur",
   "representasi": "teks",
   "struktur": "persamaan implisit dari hubungan waktu"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "Ayah = 5 x Doni; 4 tahun lagi jumlah 62",
   "ditanyakan": "umur Ayah dan Doni sekarang",
   "persamaan": "a = 5d",
   "rumus": ""
  },
  "mg": {
   "level1": "Ubah kalimat 'umur Ayah 5 kali umur Doni' dan 'empat tahun lagi' menjadi persamaan. Berapa umur masing-masing empat tahun lagi?",
   "level2": "Misalkan a umur Ayah dan d umur Doni sekarang. Persamaan pertama dari perbandingan umur, persamaan kedua dari jumlah umur empat tahun lagi.",
   "level3": "contoh-5"
  }
 },
 {
  "id": "U1-A",
  "pola": "utuh",
  "tingkat": "hots",
  "judul": "Toko Buah (koefisien besar)",
  "teks": "Pak Budi membeli 5 kg jeruk dan 4 kg mangga seharga Rp233.000. Pak Candra membeli 7 kg jeruk dan 3 kg mangga seharga Rp243.000 di toko buah yang sama. Tentukan harga 1 kg jeruk dan 1 kg mangga.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga 1 kg jeruk",
    "satuan": "Rp"
   },
   {
    "label": "Harga 1 kg mangga",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "5j + 4m = 233000",
    "7j + 3m = 243000"
   ],
   "nilai": [
    21000,
    32000
   ],
   "hasil": "jeruk Rp21.000, mangga Rp32.000"
  },
  "ciri": {
   "konteks": "toko buah",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Pak Budi: 5 jeruk + 4 mangga = 233.000",
   "ditanyakan": "harga jeruk dan mangga",
   "persamaan": "",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Tulis apa yang dibeli Pak Budi dan berapa yang dibayar, lalu Pak Candra. Dua besaran apa yang kamu cari?",
   "level2": "Misalkan j harga jeruk dan m harga mangga per kg. Koefisiennya agak besar: cari kelipatan yang membuat salah satu koefisien sama.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "U1-B",
  "pola": "utuh",
  "tingkat": "hots",
  "judul": "Toko Kain",
  "teks": "Bu Rina membeli 4 m kain batik dan 6 m kain polos seharga Rp590.000. Bu Siti membeli 5 m kain batik dan 3 m kain polos seharga Rp490.000 di toko kain yang sama. Tentukan harga per meter kain batik dan kain polos.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga per meter kain batik",
    "satuan": "Rp"
   },
   {
    "label": "Harga per meter kain polos",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "4b + 6p = 590000",
    "5b + 3p = 490000"
   ],
   "nilai": [
    65000,
    55000
   ],
   "hasil": "batik Rp65.000/m, polos Rp55.000/m"
  },
  "ciri": {
   "konteks": "toko kain",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Bu Rina: 4 batik + 6 polos = 590.000; Bu Siti: 5 batik + 3 polos = 490.000",
   "ditanyakan": "harga batik dan polos per meter",
   "persamaan": "4b + 6p = 590.000",
   "rumus": ""
  },
  "mg": {
   "level1": "Apa saja yang dibeli Bu Rina dan Bu Siti? Tulis dua hubungan harga dan panjang kain.",
   "level2": "Misalkan b harga per meter kain batik dan p kain polos. Coba kalikan persamaan kedua dengan 2 untuk menyamakan koefisien p.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "U1-C",
  "pola": "utuh",
  "tingkat": "hots",
  "judul": "Tiket Pameran",
  "teks": "Gita membeli 3 tiket reguler dan 5 tiket VIP seharga Rp345.000. Hani membeli 6 tiket reguler dan 2 tiket VIP seharga Rp330.000 di pameran yang sama. Tentukan harga satu tiket reguler dan satu tiket VIP.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Harga tiket reguler",
    "satuan": "Rp"
   },
   {
    "label": "Harga tiket VIP",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "3r + 5v = 345000",
    "6r + 2v = 330000"
   ],
   "nilai": [
    40000,
    45000
   ],
   "hasil": "reguler Rp40.000, VIP Rp45.000"
  },
  "ciri": {
   "konteks": "pameran",
   "representasi": "teks",
   "struktur": "dua persamaan eksplisit"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks dan angka",
  "foto": {
   "diketahui": "Gita: 3 reguler + 5 VIP = 345.000",
   "ditanyakan": "harga tiket reguler dan VIP",
   "persamaan": "",
   "rumus": "substitusi"
  },
  "mg": {
   "level1": "Dua jenis tiket dan dua pembeli: tulis hubungan jumlah tiket dengan total bayar masing-masing.",
   "level2": "Misalkan r harga tiket reguler dan v tiket VIP. Perhatikan persamaan kedua: semua koefisiennya bisa disederhanakan dulu.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "U2-A",
  "pola": "kontras",
  "tingkat": "hots",
  "judul": "Selisih Umur (satu informasi)",
  "teks": "Selisih umur Pak Hadi dan putranya, Rafa, adalah 28 tahun. (a) Apakah informasi ini cukup untuk menentukan umur Pak Hadi dan Rafa saat ini? (b) Jika tidak, tuliskan dua pasangan umur yang mungkin.",
  "konsep": "bukan-SPLDV",
  "jawabTipe": "dua-pasang",
  "alasan": "satu-persamaan",
  "jawab": [
   {
    "label": "Pasangan 1: umur Pak Hadi",
    "satuan": "tahun"
   },
   {
    "label": "Pasangan 1: umur Rafa",
    "satuan": "tahun"
   },
   {
    "label": "Pasangan 2: umur Pak Hadi",
    "satuan": "tahun"
   },
   {
    "label": "Pasangan 2: umur Rafa",
    "satuan": "tahun"
   }
  ],
  "kunci": {
   "persamaan": [
    "a - r = 28"
   ],
   "model": [
    1,
    -1,
    28
   ],
   "contohPasangan": [
    40,
    12,
    35,
    7
   ],
   "hasil": "tidak ada jawaban tunggal; contoh (40; 12) dan (35; 7)"
  },
  "ciri": {
   "konteks": "umur",
   "representasi": "teks",
   "struktur": "satu persamaan"
  },
  "aspekKritis": [
   "Pada soal ini aspek kritis SPLDV tidak terpenuhi sepenuhnya (itulah kontrasnya)"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "selisih umur = 28",
   "ditanyakan": "umur Pak Hadi dan Rafa",
   "persamaan": "a - r = 28",
   "rumus": ""
  },
  "mg": {
   "level1": "Apakah informasi selisih umur saja cukup untuk menentukan umur keduanya? Coba ganti-ganti umur Rafa.",
   "level2": "Pilih satu umur untuk Rafa, lalu hitung umur Pak Hadi. Cari dua pasangan umur yang berbeda.",
   "level3": "contoh-2a"
  }
 },
 {
  "id": "U2-B",
  "pola": "kontras",
  "tingkat": "hots",
  "judul": "Selisih Umur (dua informasi)",
  "teks": "Selisih umur Pak Hadi dan Rafa adalah 28 tahun. Empat tahun yang lalu, umur Pak Hadi 5 kali umur Rafa. Tentukan umur Pak Hadi dan Rafa sekarang.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Umur Pak Hadi",
    "satuan": "tahun"
   },
   {
    "label": "Umur Rafa",
    "satuan": "tahun"
   }
  ],
  "kunci": {
   "persamaan": [
    "a - r = 28",
    "a - 4 = 5(r - 4)"
   ],
   "nilai": [
    39,
    11
   ],
   "hasil": "Pak Hadi 39 tahun, Rafa 11 tahun"
  },
  "ciri": {
   "konteks": "umur",
   "representasi": "teks",
   "struktur": "dua persamaan"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "selisih 28; 4 tahun lalu Pak Hadi = 5 x Rafa",
   "ditanyakan": "umur sekarang",
   "persamaan": "a - r = 28",
   "rumus": ""
  },
  "mg": {
   "level1": "Sekarang ada dua informasi. Tulis informasi selisih umur sebagai persamaan pertama. Apa makna 'empat tahun yang lalu'?",
   "level2": "Empat tahun yang lalu umur Pak Hadi adalah a - 4 dan umur Rafa r - 4. Tulis hubungan 5 kalinya sebagai persamaan kedua.",
   "level3": "contoh-5"
  }
 },
 {
  "id": "U2-C",
  "pola": "kontras",
  "tingkat": "hots",
  "judul": "Jumlah Kuadrat",
  "teks": "Dua bilangan positif x dan y memenuhi: jumlahnya 14 dan jumlah kuadratnya 100. Apakah sistem persamaan ini termasuk SPLDV? Jelaskan alasanmu.",
  "konsep": "bukan-SPLDV",
  "jawabTipe": "pernyataan",
  "alasan": "tidak-linear",
  "jawab": [],
  "kunci": {
   "persamaan": [
    "x + y = 14",
    "x^2 + y^2 = 100"
   ],
   "pasangan": [
    [
     6,
     8
    ],
    [
     8,
     6
    ]
   ],
   "hasil": "bukan SPLDV karena ada variabel berpangkat dua; nilainya 6 dan 8"
  },
  "ciri": {
   "konteks": "bilangan",
   "representasi": "teks",
   "struktur": "dua persamaan, satu tidak linear"
  },
  "aspekKritis": [
   "Pada soal ini aspek kritis SPLDV tidak terpenuhi sepenuhnya (itulah kontrasnya)"
  ],
  "aspekVariasi": "SPLDV vs bukan SPLDV",
  "foto": {
   "diketahui": "x + y = 14; x² + y² = 100",
   "ditanyakan": "apakah SPLDV?",
   "persamaan": "x + y = 14",
   "rumus": ""
  },
  "mg": {
   "level1": "Tulis kedua kalimat sebagai persamaan. Perhatikan persamaan yang memuat jumlah kuadrat: apakah variabelnya berpangkat satu?",
   "level2": "Pada SPLDV semua variabel berpangkat satu. Periksa kedua persamaanmu dengan ciri itu.",
   "level3": "contoh-2c"
  }
 },
 {
  "id": "U3-A",
  "pola": "generalisasi",
  "tingkat": "hots",
  "judul": "Pesanan Kantin Tiga Hari (tabel)",
  "teks": "Tabel berikut mencatat pesanan di sebuah kantin selama tiga hari. Tentukan harga semangkuk bakso dan semangkuk mie ayam.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "tabel",
   "kolom": [
    "Hari",
    "Bakso",
    "Mie ayam",
    "Total bayar"
   ],
   "baris": [
    [
     "Senin",
     "4",
     "2",
     "Rp98.000"
    ],
    [
     "Selasa",
     "3",
     "5",
     "Rp140.000"
    ],
    [
     "Rabu",
     "7",
     "7",
     "Rp238.000"
    ]
   ]
  },
  "jawab": [
   {
    "label": "Harga semangkuk bakso",
    "satuan": "Rp"
   },
   {
    "label": "Harga semangkuk mie ayam",
    "satuan": "Rp"
   }
  ],
  "kunci": {
   "persamaan": [
    "4b + 2m = 98000",
    "3b + 5m = 140000"
   ],
   "nilai": [
    15000,
    19000
   ],
   "hasil": "bakso Rp15.000, mie ayam Rp19.000 (baris Rabu = Senin + Selasa, tidak perlu dipakai)"
  },
  "ciri": {
   "konteks": "kantin",
   "representasi": "tabel",
   "struktur": "dua persamaan dari tabel dengan satu baris berlebih"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "Senin: 4 bakso, 2 mie ayam = 98.000",
   "ditanyakan": "harga bakso dan mie ayam",
   "persamaan": "",
   "rumus": "eliminasi"
  },
  "mg": {
   "level1": "Tabel punya tiga baris. Baca tiap baris sebagai satu kalimat. Apakah semua baris diperlukan?",
   "level2": "Dua baris sudah cukup untuk dua persamaan. Coba cek apakah baris ketiga menambah informasi baru.",
   "level3": "contoh-3"
  }
 },
 {
  "id": "U3-B",
  "pola": "generalisasi",
  "tingkat": "hots",
  "judul": "Dua Lift Barang",
  "teks": "Perhatikan kedua lift barang pada diagram berikut. Tentukan massa satu kotak besar dan satu kotak kecil.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "lift",
   "set": [
    {
     "isi": [
      [
       "kotak besar",
       3
      ],
      [
       "kotak kecil",
       2
      ]
     ],
     "total": "Total 65 kg"
    },
    {
     "isi": [
      [
       "kotak besar",
       1
      ],
      [
       "kotak kecil",
       4
      ]
     ],
     "total": "Total 55 kg"
    }
   ],
   "besar": "kotak besar",
   "kecil": "kotak kecil"
  },
  "jawab": [
   {
    "label": "Massa satu kotak besar",
    "satuan": "kg"
   },
   {
    "label": "Massa satu kotak kecil",
    "satuan": "kg"
   }
  ],
  "kunci": {
   "persamaan": [
    "3B + 2K = 65",
    "B + 4K = 55"
   ],
   "nilai": [
    15,
    10
   ],
   "hasil": "kotak besar 15 kg, kotak kecil 10 kg"
  },
  "ciri": {
   "konteks": "pergudangan",
   "representasi": "diagram",
   "struktur": "dua persamaan dari dua kondisi total"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "3 kotak besar + 2 kotak kecil = 65 kg",
   "ditanyakan": "massa kotak besar dan kecil",
   "persamaan": "3B + 2K = 65",
   "rumus": ""
  },
  "mg": {
   "level1": "Tiap lift memuat dua jenis kotak dan total massanya tertulis. Apa persamaan dari tiap lift?",
   "level2": "Misalkan B massa kotak besar dan K massa kotak kecil. Persamaan kedua mudah dinyatakan B = ... lalu disubstitusikan.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "U3-C",
  "pola": "generalisasi",
  "tingkat": "hots",
  "judul": "Kartu Permainan (grafik)",
  "teks": "Tia mengumpulkan x kartu merah dan y kartu biru. Dua petunjuk digambarkan oleh garis hijau dan garis biru. Tentukan persamaan tiap garis dan banyak kartu merah dan biru yang dikumpulkan Tia.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "tampilan": {
   "tipe": "grafik",
   "maks": 12,
   "sumbuX": "x (kartu merah)",
   "sumbuY": "y (kartu biru)",
   "garis": [
    {
     "warna": "hijau",
     "label": "Petunjuk hijau",
     "titik": [
      [
       0,
       4
      ],
      [
       4,
       8
      ]
     ]
    },
    {
     "warna": "biru",
     "label": "Petunjuk biru",
     "titik": [
      [
       0,
       10
      ],
      [
       5,
       5
      ]
     ]
    }
   ]
  },
  "jawab": [
   {
    "label": "Banyak kartu merah",
    "satuan": ""
   },
   {
    "label": "Banyak kartu biru",
    "satuan": ""
   }
  ],
  "kunci": {
   "persamaan": [
    "y = x + 4",
    "x + y = 10"
   ],
   "nilai": [
    3,
    7
   ],
   "hasil": "kartu merah 3, kartu biru 7"
  },
  "ciri": {
   "konteks": "permainan kartu",
   "representasi": "grafik",
   "struktur": "dua persamaan dari titik pada garis"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Konteks, representasi, dan angka",
  "foto": {
   "diketahui": "garis hijau melalui (0,4) dan (4,8); garis biru melalui (0,10) dan (5,5)",
   "ditanyakan": "kartu merah dan biru",
   "persamaan": "",
   "rumus": "grafik"
  },
  "mg": {
   "level1": "Titik potong kedua garis memenuhi kedua persamaan. Dari dua titik pada tiap garis, bagaimana kamu mencari persamaannya?",
   "level2": "Garis hijau melalui (0, 4) dan (4, 8): cari berapa kenaikan y tiap x bertambah 1. Garis biru melalui (0, 10) dan (5, 5): cari hubungan x dan y.",
   "level3": "contoh-1"
  }
 },
 {
  "id": "U4-A",
  "pola": "fusi",
  "tingkat": "hots",
  "judul": "Persegi Panjang Menjadi Persegi",
  "teks": "Keliling sebuah persegi panjang adalah 52 cm. Jika panjangnya dikurangi 3 cm dan lebarnya ditambah 3 cm, bangun tersebut menjadi persegi. Tentukan luas persegi panjang semula.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Luas persegi panjang semula",
    "satuan": "cm²"
   }
  ],
  "kunci": {
   "persamaan": [
    "p + l = 26",
    "p - 3 = l + 3"
   ],
   "var": [
    16,
    10
   ],
   "nilai": [
    160
   ],
   "hasil": "p = 16 cm, l = 10 cm, luas 160 cm²"
  },
  "ciri": {
   "konteks": "geometri",
   "representasi": "teks",
   "struktur": "dua persamaan implisit dari rumus keliling dan sifat persegi"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "keliling = 52; (p - 3) = (l + 3)",
   "ditanyakan": "luas semula",
   "persamaan": "p + l = 26",
   "rumus": "K = 2(p + l)"
  },
  "mg": {
   "level1": "Gambarkan persegi panjangnya. Apa yang terjadi pada ukurannya, dan apa sifat persegi?",
   "level2": "Keliling memberi persamaan p + l = ... Setelah diubah menjadi persegi, panjang barunya sama dengan lebar barunya. Tulis itu sebagai persamaan kedua; jawaban akhir yang diminta adalah luas.",
   "level3": "contoh-4"
  }
 },
 {
  "id": "U4-B",
  "pola": "fusi",
  "tingkat": "hots",
  "judul": "Bilangan Dua Angka",
  "teks": "Sebuah bilangan terdiri dari dua angka. Jumlah kedua angkanya 11. Jika kedua angkanya ditukar tempatnya, bilangan yang baru 27 lebih besar dari bilangan semula. Tentukan bilangan semula.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Bilangan semula",
    "satuan": ""
   }
  ],
  "kunci": {
   "persamaan": [
    "x + y = 11",
    "(10y + x) - (10x + y) = 27"
   ],
   "var": [
    4,
    7
   ],
   "nilai": [
    47
   ],
   "hasil": "angka puluhan 4 dan satuan 7, bilangan semula 47"
  },
  "ciri": {
   "konteks": "bilangan",
   "representasi": "teks",
   "struktur": "persamaan implisit dari nilai tempat"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "jumlah angka = 11; setelah ditukar lebih besar 27",
   "ditanyakan": "bilangan semula",
   "persamaan": "x + y = 11",
   "rumus": ""
  },
  "mg": {
   "level1": "Bilangan dua angka dengan angka puluhan x dan satuan y nilainya berapa? Bagaimana nilai setelah angkanya ditukar?",
   "level2": "Bilangan semula 10x + y dan setelah ditukar 10y + x. Tulis 'jumlah angkanya 11' dan 'selisihnya 27' sebagai dua persamaan.",
   "level3": "contoh-5"
  }
 },
 {
  "id": "U4-C",
  "pola": "fusi",
  "tingkat": "hots",
  "judul": "Perahu di Sungai",
  "teks": "Sebuah perahu menempuh 36 km ke arah hilir dalam waktu 3 jam, lalu menempuh 18 km ke arah hulu (melawan arus) dalam waktu 3 jam. Tentukan kecepatan perahu di air tenang dan kecepatan arus sungai dalam km/jam.",
  "konsep": "SPLDV",
  "jawabTipe": "nilai",
  "jawab": [
   {
    "label": "Kecepatan perahu di air tenang",
    "satuan": "km/jam"
   },
   {
    "label": "Kecepatan arus sungai",
    "satuan": "km/jam"
   }
  ],
  "kunci": {
   "persamaan": [
    "v + a = 12",
    "v - a = 6"
   ],
   "nilai": [
    9,
    3
   ],
   "hasil": "perahu 9 km/jam, arus 3 km/jam"
  },
  "ciri": {
   "konteks": "sungai",
   "representasi": "teks",
   "struktur": "persamaan implisit dari kecepatan = jarak / waktu"
  },
  "aspekKritis": [
   "Dua besaran yang belum diketahui",
   "Dua hubungan linear (dua persamaan)",
   "Penyelesaian yang memenuhi keduanya sekaligus"
  ],
  "aspekVariasi": "Aspek kritis dipadukan; persamaan implisit",
  "foto": {
   "diketahui": "hilir 36 km 3 jam; hulu 18 km 3 jam",
   "ditanyakan": "kecepatan perahu dan arus",
   "persamaan": "",
   "rumus": "kecepatan = jarak / waktu"
  },
  "mg": {
   "level1": "Kecepatan = jarak / waktu. Berapa kecepatan perahu searah arus dan melawan arus? Bagaimana arus memengaruhinya?",
   "level2": "Searah arus kecepatan perahu bertambah oleh arus, melawan arus berkurang. Misalkan v kecepatan perahu dan a kecepatan arus; tulis dua persamaannya.",
   "level3": "contoh-4"
  }
 }
]

export const SOAL_BY_ID = Object.fromEntries(SOAL_MISI.map((s) => [s.id, s]))
