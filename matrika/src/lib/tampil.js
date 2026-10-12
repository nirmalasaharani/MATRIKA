// Merapikan teks soal untuk ditampilkan (data tetap ASCII agar mudah diketik dan dicocokkan).
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
export const rapikan = (s) => String(s ?? '')
  .replace(/\^(\d)/g, (_, d) => SUP[d])
  .replace(/cm2/g, 'cm²').replace(/cm3/g, 'cm³')
  .replace(/\bpi\b/g, 'π')
export const NAMA_TINGKAT = { mudah: 'Mudah', sedang: 'Sedang', sulit: 'Sulit', campuran: 'Campuran' }
