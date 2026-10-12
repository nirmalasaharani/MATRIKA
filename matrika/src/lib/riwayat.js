// Riwayat latihan/try out, jejak "terakhir dibuka", penanda materi dibaca, status Bank Soal.
const baca = (key, f) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : f } catch { return f } }
const tulis = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* abaikan */ } }

export const bacaRiwayat = (uid) => baca(`matrika_riwayat_${uid}`, [])
export const tambahRiwayat = (uid, r) => tulis(`matrika_riwayat_${uid}`, [{ ...r, waktu: Date.now() }, ...bacaRiwayat(uid)].slice(0, 100))

export const bacaJejak = (uid) => baca(`matrika_jejak_${uid}`, [])
export const catatJejak = (uid, item) => tulis(`matrika_jejak_${uid}`, [{ ...item, waktu: Date.now() }, ...bacaJejak(uid).filter((x) => x.ke !== item.ke)].slice(0, 6))

export const bacaSudahBaca = (uid) => baca(`matrika_baca_${uid}`, [])
export const tandaiBaca = (uid, babId) => { const d = bacaSudahBaca(uid); if (!d.includes(babId)) tulis(`matrika_baca_${uid}`, [...d, babId]) }

export const bacaBank = (uid) => baca(`matrika_bank_${uid}`, {})
export const simpanBank = (uid, id, patch) => { const d = bacaBank(uid); tulis(`matrika_bank_${uid}`, { ...d, [id]: { ...(d[id] || {}), ...patch } }) }
