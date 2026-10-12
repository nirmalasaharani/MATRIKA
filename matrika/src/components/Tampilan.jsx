// Gambar soal: tabel, timbangan, grafik, lift (SVG dibuat dari data soal).
const BIRU = '#2F6FB5', ORANYE = '#F08A24', HIJAU = '#1b9e5a'

function Tabel({ t }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] border-collapse text-sm">
        <thead><tr>{t.kolom.map((k) => <th key={k} className="border border-slate-200 bg-brand px-3 py-2 text-left font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg">{k}</th>)}</tr></thead>
        <tbody>{t.baris.map((b, i) => (
          <tr key={i} className={i % 2 ? 'bg-brand-soft/60' : 'bg-white'}>{b.map((c, j) => <td key={j} className="border border-slate-200 px-3 py-2">{c}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  )
}

const ratakan = (isi) => isi.flatMap(([nama, n]) => Array.from({ length: n }, () => nama))
const Legenda = ({ t }) => (
  <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-600">
    <span className="flex items-center gap-1.5"><svg width="18" height="18"><circle cx="9" cy="9" r="8" fill={BIRU} /></svg>{t.besar} (besar)</span>
    <span className="flex items-center gap-1.5"><svg width="18" height="18"><circle cx="9" cy="9" r="5" fill={ORANYE} /></svg>{t.kecil} (kecil)</span>
  </div>
)

function Timbangan({ t }) {
  return (
    <div>
      <svg viewBox="0 0 570 240" role="img" aria-label={`Dua timbangan seimbang: ${t.set.map((s) => `${s.kiri.map(([n, k]) => `${k} ${n}`).join(' dan ')} seimbang dengan ${s.kanan}`).join('; ')}`} className="w-full">
        {t.set.map((s, i) => {
          const ox = i * 285
          const items = ratakan(s.kiri)
          return (
            <g key={i}>
              <text x={ox + 135} y="18" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">Timbangan {i + 1}</text>
              <polygon points={`${ox + 135},60 ${ox + 118},190 ${ox + 152},190`} fill="#CBD5E1" />
              <rect x={ox + 100} y="190" width="70" height="8" rx="4" fill="#94A3B8" />
              <line x1={ox + 55} y1="60" x2={ox + 215} y2="60" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
              <circle cx={ox + 135} cy="60" r="7" fill="#475569" />
              {[55, 215].map((cx) => (<g key={cx}>
                <line x1={ox + cx} y1="60" x2={ox + cx - 50} y2="140" stroke="#94A3B8" /><line x1={ox + cx} y1="60" x2={ox + cx + 50} y2="140" stroke="#94A3B8" />
                <rect x={ox + cx - 55} y="140" width="110" height="7" rx="3.5" fill="#64748B" /></g>))}
              {items.map((nama, j) => {
                const besar = nama === t.besar, r = besar ? 17 : 11
                const baris = Math.floor(j / 3), kolom = j % 3, jml = Math.min(3, items.length - baris * 3)
                const x = ox + 55 + (kolom - (jml - 1) / 2) * 36
                const y = 140 - 18 - baris * 36 + (besar ? 0 : 6)
                return <circle key={j} cx={x} cy={y} r={r} fill={besar ? BIRU : ORANYE} stroke="#fff" strokeWidth="1.5" />
              })}
              <rect x={ox + 215 - 38} y="102" width="76" height="38" rx="6" fill="#E2E8F0" stroke="#64748B" />
              <text x={ox + 215} y="127" textAnchor="middle" fontSize="15" fontWeight="700" fill="#14263D">{s.kanan}</text>
            </g>
          )
        })}
      </svg>
      <Legenda t={t} />
    </div>
  )
}

function Lift({ t }) {
  return (
    <div>
      <svg viewBox="0 0 540 230" role="img" aria-label={`Dua lift barang: ${t.set.map((s) => `${s.isi.map(([n, k]) => `${k} ${n}`).join(' dan ')}, ${s.total}`).join('; ')}`} className="w-full">
        {t.set.map((s, i) => {
          const ox = 20 + i * 265
          const items = ratakan(s.isi)
          return (
            <g key={i}>
              <text x={ox + 110} y="16" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">Lift {i + 1}</text>
              <rect x={ox} y="26" width="220" height="150" rx="8" fill="#F8FAFC" stroke="#475569" strokeWidth="3" />
              <line x1={ox + 110} y1="26" x2={ox + 110} y2="6" stroke="#475569" strokeWidth="3" />
              {items.map((nama, j) => {
                const besar = nama === t.besar, w = besar ? 36 : 22
                const baris = Math.floor(j / 5), kolom = j % 5
                return <rect key={j} x={ox + 14 + kolom * 40 + (besar ? 0 : 7)} y={176 - 8 - w - baris * 44 - (besar ? 0 : 0)} width={w} height={w} rx="3" fill={besar ? BIRU : ORANYE} stroke="#fff" />
              })}
              <rect x={ox} y="176" width="220" height="6" fill="#475569" />
              <text x={ox + 110} y="208" textAnchor="middle" fontSize="15" fontWeight="700" fill="#14263D">{s.total}</text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5"><svg width="18" height="18"><rect x="1" y="1" width="16" height="16" fill={BIRU} /></svg>{t.besar}</span>
        <span className="flex items-center gap-1.5"><svg width="18" height="18"><rect x="4" y="4" width="10" height="10" fill={ORANYE} /></svg>{t.kecil}</span>
      </div>
    </div>
  )
}

const WARNA = { hijau: HIJAU, biru: BIRU }
function potong([x1, y1], [x2, y2], m) {
  const dx = x2 - x1, dy = y2 - y1
  let lo = -1e9, hi = 1e9
  for (const [p, d] of [[x1, dx], [y1, dy]]) {
    if (d === 0) continue
    const a = (0 - p) / d, b = (m - p) / d
    lo = Math.max(lo, Math.min(a, b)); hi = Math.min(hi, Math.max(a, b))
  }
  return [[x1 + lo * dx, y1 + lo * dy], [x1 + hi * dx, y1 + hi * dy]]
}

function Grafik({ t }) {
  const S = 300, L = 46, T = 18, m = t.maks, px = (x) => L + (x * S) / m, py = (y) => T + ((m - y) * S) / m
  const tick = Array.from({ length: Math.floor(m / 2) + 1 }, (_, i) => i * 2)
  return (
    <div>
      <svg viewBox="0 0 370 372" role="img" aria-label={`Grafik dua garis: ${t.garis.map((g) => `${g.label} melalui ${g.titik.map(([x, y]) => `(${x}, ${y})`).join(' dan ')}`).join('; ')}`} className="mx-auto w-full max-w-md">
        {tick.map((v) => (<g key={v}>
          <line x1={px(v)} y1={py(0)} x2={px(v)} y2={py(m)} stroke="#E2E8F0" /><line x1={px(0)} y1={py(v)} x2={px(m)} y2={py(v)} stroke="#E2E8F0" />
          <text x={px(v)} y={py(0) + 15} textAnchor="middle" fontSize="11" fill="#475569">{v}</text>
          <text x={px(0) - 8} y={py(v) + 4} textAnchor="end" fontSize="11" fill="#475569">{v}</text></g>))}
        <line x1={px(0)} y1={py(0)} x2={px(m)} y2={py(0)} stroke="#334155" strokeWidth="2" />
        <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(m)} stroke="#334155" strokeWidth="2" />
        <text x={px(m / 2)} y="364" textAnchor="middle" fontSize="12" fill="#334155">{t.sumbuX}</text>
        <text transform={`translate(12 ${py(m / 2)}) rotate(-90)`} textAnchor="middle" fontSize="12" fill="#334155">{t.sumbuY}</text>
        {t.garis.map((g, i) => {
          const [a, b] = potong(g.titik[0], g.titik[1], m)
          const c = WARNA[g.warna]
          return (<g key={i}>
            <line x1={px(a[0])} y1={py(a[1])} x2={px(b[0])} y2={py(b[1])} stroke={c} strokeWidth="3" strokeLinecap="round" />
            {g.titik.map(([x, y]) => (<g key={`${x}-${y}`}><circle cx={px(x)} cy={py(y)} r="4.5" fill={c} stroke="#fff" strokeWidth="1.5" />
              <text x={px(x) + 7} y={py(y) - 7} fontSize="11" fontWeight="600" fill={c}>({x}, {y})</text></g>))}
          </g>)
        })}
        {t.potong && (<g><circle cx={px(t.potong[0])} cy={py(t.potong[1])} r="6" fill="#fff" stroke="#E11D48" strokeWidth="2.5" />
          <text x={px(t.potong[0]) + 9} y={py(t.potong[1]) + 18} fontSize="12" fontWeight="700" fill="#E11D48">({t.potong[0]}, {t.potong[1]})</text></g>)}
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-4 text-xs text-slate-600">
        {t.garis.map((g) => <span key={g.label} className="flex items-center gap-1.5"><svg width="22" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke={WARNA[g.warna]} strokeWidth="3" /></svg>{g.label} (garis {g.warna})</span>)}
      </div>
    </div>
  )
}

export default function TampilanSoal({ t }) {
  if (!t) return null
  const isi = t.tipe === 'tabel' ? <Tabel t={t} /> : t.tipe === 'timbangan' ? <Timbangan t={t} /> : t.tipe === 'lift' ? <Lift t={t} /> : t.tipe === 'grafik' ? <Grafik t={t} /> : null
  return <div className="mt-4 rounded-xl bg-white p-3 ring-1 ring-slate-200">{isi}</div>
}
