// Ilustrasi materi (SVG buatan sendiri).
import TampilanSoal from './Tampilan.jsx'
const BIRU = '#2F6FB5', ORANYE = '#F08A24', TEAL = '#1FA39A', NAVY = '#14263D'

const Kanvas = ({ vb = '0 0 320 210', label, children }) => (
  <svg viewBox={vb} role="img" aria-label={label} className="mx-auto w-full max-w-md">{children}</svg>
)

function Pola() {
  const px = [40, 105, 175, 255]
  return (
    <Kanvas label="Pola bilangan segitiga: 1, 3, 6, 10 titik">
      {[1, 2, 3, 4].map((k) => {
        const dots = []
        for (let j = 1; j <= k; j++) for (let i = 0; i < j; i++) dots.push(<circle key={`${j}-${i}`} cx={px[k - 1] + (i - (j - 1) / 2) * 17} cy={150 - (k - j) * 15} r="6" fill={j === k && k > 1 ? ORANYE : BIRU} />)
        return <g key={k}>{dots}<text x={px[k - 1]} y="188" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>{[1, 3, 6, 10][k - 1]}</text></g>
      })}
    </Kanvas>
  )
}

function Relasi() {
  const A = [['1', 55], ['2', 105], ['3', 155]], B = [['a', 70], ['b', 130]]
  const to = [0, 1, 1]
  return (
    <Kanvas label="Diagram panah dari himpunan A ke himpunan B">
      <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill={BIRU} /></marker></defs>
      <ellipse cx="85" cy="105" rx="48" ry="85" fill="#E8F0F9" stroke={BIRU} /><ellipse cx="235" cy="105" rx="48" ry="85" fill="#E3F5F3" stroke={TEAL} />
      <text x="85" y="14" textAnchor="middle" fontSize="12" fontWeight="600" fill={NAVY}>A (domain)</text>
      <text x="235" y="14" textAnchor="middle" fontSize="12" fontWeight="600" fill={NAVY}>B (kodomain)</text>
      {A.map(([t, y], i) => <line key={t} x1="100" y1={y} x2="218" y2={B[to[i]][1] + 25} stroke={BIRU} strokeWidth="2" markerEnd="url(#ah)" />)}
      {A.map(([t, y]) => <g key={t}><circle cx="85" cy={y} r="4" fill={BIRU} /><text x="68" y={y + 4} fontSize="14" textAnchor="end" fill={NAVY}>{t}</text></g>)}
      {B.map(([t, y]) => <g key={t}><circle cx="235" cy={y + 25} r="4" fill={TEAL} /><text x="250" y={y + 29} fontSize="14" fill={NAVY}>{t}</text></g>)}
    </Kanvas>
  )
}

function Pythagoras() {
  return (
    <Kanvas vb="0 0 300 270" label="Segitiga siku-siku 3, 4, 5 dengan persegi pada tiap sisinya">
      <polygon points="100,104 188,170 254,82 166,16" fill="#FEF1E3" stroke={ORANYE} strokeWidth="2" />
      <rect x="100" y="170" width="88" height="88" fill="#E8F0F9" stroke={BIRU} strokeWidth="2" />
      <rect x="34" y="104" width="66" height="66" fill="#E3F5F3" stroke={TEAL} strokeWidth="2" />
      <polygon points="100,170 188,170 100,104" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
      <path d="M100 156h14v14" fill="none" stroke={NAVY} strokeWidth="1.5" />
      <text x="144" y="218" textAnchor="middle" fontSize="15" fontWeight="700" fill={BIRU}>b² = 16</text>
      <text x="67" y="142" textAnchor="middle" fontSize="15" fontWeight="700" fill={TEAL}>a² = 9</text>
      <text x="210" y="56" textAnchor="middle" fontSize="15" fontWeight="700" fill={ORANYE}>c² = 25</text>
      <text x="144" y="188" textAnchor="middle" fontSize="12" fill={NAVY}>4</text><text x="90" y="140" textAnchor="end" fontSize="12" fill={NAVY}>3</text><text x="152" y="130" fontSize="12" fill={NAVY}>5</text>
    </Kanvas>
  )
}

function Lingkaran() {
  return (
    <Kanvas vb="0 0 320 220" label="Lingkaran dengan jari-jari, diameter, tali busur, dan juring">
      <circle cx="160" cy="110" r="90" fill="#F8FAFC" stroke={NAVY} strokeWidth="2.5" />
      <path d="M160 110 L250 110 A90 90 0 0 0 217.8 41.1 Z" fill="#FEF1E3" stroke={ORANYE} strokeWidth="2" />
      <line x1="70" y1="110" x2="250" y2="110" stroke={BIRU} strokeWidth="2.5" />
      <line x1="82.1" y1="65" x2="91.1" y2="167.8" stroke={TEAL} strokeWidth="2.5" />
      <circle cx="160" cy="110" r="4" fill={NAVY} />
      <text x="160" y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill={NAVY}>O</text>
      <text x="108" y="104" fontSize="12" fontWeight="600" fill={BIRU}>diameter (d)</text>
      <text x="200" y="104" fontSize="12" fontWeight="600" fill={BIRU}>r</text>
      <text x="38" y="120" fontSize="12" fontWeight="600" fill={TEAL}>tali busur</text>
      <text x="232" y="82" fontSize="12" fontWeight="600" fill={ORANYE}>juring</text>
    </Kanvas>
  )
}

function Bangun() {
  return (
    <Kanvas vb="0 0 260 220" label="Kubus dengan rusuk s">
      <polygon points="50,100 90,60 190,60 150,100" fill="#E8F0F9" stroke={NAVY} strokeWidth="2" />
      <polygon points="150,100 190,60 190,160 150,200" fill="#E3F5F3" stroke={NAVY} strokeWidth="2" />
      <rect x="50" y="100" width="100" height="100" fill="#FEF1E3" stroke={NAVY} strokeWidth="2" />
      <g stroke={NAVY} strokeWidth="1.5" strokeDasharray="5 4" fill="none"><path d="M90 60V160H190" /><path d="M50 200L90 160" /></g>
      <text x="100" y="218" textAnchor="middle" fontSize="14" fontWeight="700" fill={BIRU}>s</text>
      <text x="38" y="155" textAnchor="end" fontSize="14" fontWeight="700" fill={BIRU}>s</text>
      <text x="178" y="86" fontSize="14" fontWeight="700" fill={BIRU}>s</text>
    </Kanvas>
  )
}

function Statistika() {
  const d = [['60', 2], ['70', 5], ['80', 8], ['90', 4], ['100', 1]]
  return (
    <Kanvas vb="0 0 320 220" label="Diagram batang nilai ulangan: 60 ada 2 siswa, 70 ada 5, 80 ada 8, 90 ada 4, 100 ada 1">
      <line x1="40" y1="170" x2="300" y2="170" stroke={NAVY} strokeWidth="2" /><line x1="40" y1="20" x2="40" y2="170" stroke={NAVY} strokeWidth="2" />
      {[0, 2, 4, 6, 8].map((v) => <g key={v}><line x1="40" y1={170 - v * 16} x2="300" y2={170 - v * 16} stroke="#E2E8F0" /><text x="32" y={174 - v * 16} textAnchor="end" fontSize="11" fill="#475569">{v}</text></g>)}
      {d.map(([n, f], i) => <g key={n}><rect x={58 + i * 48} y={170 - f * 16} width="32" height={f * 16} rx="3" fill={f === 8 ? ORANYE : BIRU} /><text x={74 + i * 48} y="188" textAnchor="middle" fontSize="12" fill={NAVY}>{n}</text><text x={74 + i * 48} y={164 - f * 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={NAVY}>{f}</text></g>)}
      <text x="170" y="210" textAnchor="middle" fontSize="11" fill="#475569">Nilai ulangan (sumbu-x) dan banyak siswa (sumbu-y)</text>
    </Kanvas>
  )
}

const GARIS = { tipe: 'grafik', maks: 8, sumbuX: 'x', sumbuY: 'y', garis: [{ warna: 'biru', label: 'y = 2x + 1', titik: [[0, 1], [3, 7]] }] }
const SPLDV = { tipe: 'grafik', maks: 8, sumbuX: 'x', sumbuY: 'y', potong: [3, 2], garis: [{ warna: 'hijau', label: '2x + y = 8', titik: [[4, 0], [0, 8]] }, { warna: 'biru', label: 'x + y = 5', titik: [[5, 0], [0, 5]] }] }

export default function Ilustrasi({ jenis, ket }) {
  const isi = { pola: <Pola />, relasi: <Relasi />, pythagoras: <Pythagoras />, lingkaran: <Lingkaran />, bangun: <Bangun />, statistika: <Statistika />,
    garis: <TampilanSoal t={GARIS} />, spldv: <TampilanSoal t={SPLDV} /> }[jenis]
  return (
    <figure className="my-4 rounded-xl2 bg-white p-4 ring-1 ring-slate-200">
      {isi}
      {ket && <figcaption className="mt-2 text-center text-sm text-slate-600">{ket}</figcaption>}
    </figure>
  )
}
