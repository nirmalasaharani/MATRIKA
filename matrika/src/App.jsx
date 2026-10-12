import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Placeholder from './components/Placeholder.jsx'
import { RuteSiswa, RuteGuru, RuteTamu } from './components/Rute.jsx'
import { Login, Daftar } from './pages/Masuk.jsx'
import Beranda from './pages/Beranda.jsx'
import { MisiIndex, MisiJalur } from './pages/Misi.jsx'
import MisiSoal from './pages/MisiSoal.jsx'
import MisiHasil from './pages/MisiHasil.jsx'
import { MateriDaftar, MateriDetail } from './pages/Materi.jsx'
import BankSoal from './pages/BankSoal.jsx'
import { LatihanHub, LatihanBiasa } from './pages/Latihan.jsx'
import TryOut from './pages/TryOut.jsx'
import Riwayat from './pages/Riwayat.jsx'

const P = (judul) => <Placeholder judul={judul} />

export default function App() {
  return (
    <Routes>
      <Route element={<RuteTamu />}>
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
      </Route>

      <Route element={<RuteSiswa />}>
        <Route element={<Layout />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/materi" element={<MateriDaftar />} />
          <Route path="/materi/:id" element={<MateriDetail />} />
          <Route path="/bank-soal" element={<BankSoal />} />
          <Route path="/latihan" element={<LatihanHub />} />
          <Route path="/latihan/biasa" element={<LatihanBiasa />} />
          <Route path="/misi" element={<MisiIndex />} />
          <Route path="/misi/:blokId" element={<MisiJalur />} />
          <Route path="/misi/:blokId/soal" element={<MisiSoal />} />
          <Route path="/misi/:blokId/hasil" element={<MisiHasil />} />
          <Route path="/tryout" element={<TryOut />} />
          <Route path="/paket" element={P('Paket dan kuota')} />
          <Route path="/privasi" element={P('Privasi data')} />
          <Route path="/profil" element={P('Profil')} />
          <Route path="/riwayat" element={<Riwayat />} />
        </Route>
      </Route>

      <Route element={<RuteGuru />}>
        <Route path="/guru" element={<div className="p-6">{P('Dashboard guru')}</div>} />
        <Route path="/guru/siswa/:id" element={<div className="p-6">{P('Detail siswa')}</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
