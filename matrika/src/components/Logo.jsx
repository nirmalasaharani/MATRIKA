import LogoMark from './LogoMark.jsx'

export default function Logo({ tagline = false, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <LogoMark className="h-9 w-auto" />
        <span className="font-display text-xl font-bold tracking-tight text-brand">MATRIKA</span>
      </div>
      {tagline && <p className="mt-1 text-sm text-slate-500">Latih transfer konsepmu</p>}
    </div>
  )
}
