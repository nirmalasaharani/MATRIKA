// Logo MATRIKA: kurung sudut + tangga kotak (dibuat ulang sebagai SVG dari logo asli).
const NAVY = '#0F1A3A', BIRU = '#2C70B0', ORANYE = '#F39019', GELAP = '#172140'
const K = 14 // sisi kotak
const kol = [39, 56.5, 74, 91.5]
const bar = [42, 58, 74, 90]
const kotak = [
  [0, 3, BIRU],
  [1, 2, BIRU], [1, 3, GELAP],
  [2, 1, BIRU], [2, 2, GELAP], [2, 3, GELAP],
  [3, 0, ORANYE], [3, 1, ORANYE], [3, 2, ORANYE], [3, 3, ORANYE],
]
export default function LogoMark({ className = 'h-9 w-auto', judul }) {
  return (
    <svg viewBox="10 8 124 112" className={className} role={judul ? 'img' : undefined} aria-label={judul} aria-hidden={judul ? undefined : true}>
      <g fill={NAVY}>
        <path d="M15 12h23v4H19v20h-4z" /><path d="M129 12h-23v4h19v20h4z" />
        <path d="M15 114h23v-4H19V90h-4z" /><path d="M129 114h-23v-4h19V90h4z" />
      </g>
      {kotak.map(([c, r, w], i) => <rect key={i} x={kol[c]} y={bar[r]} width={K} height={K} rx="1.2" fill={w} />)}
    </svg>
  )
}
