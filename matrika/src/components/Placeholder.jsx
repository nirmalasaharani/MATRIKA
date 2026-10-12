import { useLocation } from 'react-router-dom'
import { Hammer } from 'lucide-react'
export default function Placeholder({ judul }) {
  const { pathname } = useLocation()
  return (
    <div className="card mx-auto max-w-lg p-8 text-center">
      <Hammer className="mx-auto text-brand" />
      <h1 className="mt-3 text-xl font-semibold">{judul}</h1>
      <p className="mt-1 text-sm text-slate-500">Halaman <code>{pathname}</code> dibuat pada tahap berikutnya.</p>
    </div>
  )
}
