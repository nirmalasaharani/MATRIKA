// Parser ekspresi/persamaan aljabar yang aman (tanpa eval).
// Mendukung: + - * / ^ ( ), perkalian implisit (2b, 3(x+1), xy), pemisah ribuan "19.000", koma desimal.
const norm = (s) =>
  String(s).toLowerCase()
    .replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/\s+/g, '')
    .replace(/(?<=\d)\.(?=\d{3}(?!\d))/g, '')
    .replace(/(?<=\d),(?=\d)/g, '.')

function tokenize(s) {
  const out = []
  let i = 0
  while (i < s.length) {
    const ch = s[i]
    if (/\d/.test(ch)) {
      let j = i
      while (j < s.length && /[\d.]/.test(s[j])) j++
      out.push({ t: 'n', v: parseFloat(s.slice(i, j)) }); i = j
    } else if (/[a-z]/.test(ch)) { out.push({ t: 'v', v: ch }); i++ }
    else if ('+-*/^()'.includes(ch)) { out.push({ t: ch }); i++ }
    else throw new Error('karakter "' + ch + '" tidak dikenali')
  }
  return out
}

function parse(tokens) {
  let p = 0
  const peek = () => tokens[p]
  const eat = (t) => (peek() && peek().t === t ? (p++, true) : false)
  function expr() {
    let l = term()
    while (peek() && (peek().t === '+' || peek().t === '-')) { const op = tokens[p++].t; l = { t: 'b', op, l, r: term() } }
    return l
  }
  function term() {
    let l = unary()
    for (;;) {
      const k = peek()
      if (!k) break
      if (k.t === '*' || k.t === '/') { p++; l = { t: 'b', op: k.t, l, r: unary() } }
      else if (k.t === 'v' || k.t === '(') l = { t: 'b', op: '*', l, r: unary() }
      else break
    }
    return l
  }
  function unary() { if (eat('-')) return { t: 'neg', e: unary() }; if (eat('+')) return unary(); return power() }
  function power() {
    const b = atom()
    if (eat('^')) { const k = tokens[p]; if (!k || k.t !== 'n') throw new Error('pangkat harus berupa bilangan'); p++; return { t: 'p', e: b, k: k.v } }
    return b
  }
  function atom() {
    const k = tokens[p++]
    if (!k) throw new Error('ekspresi belum lengkap')
    if (k.t === 'n') return { t: 'n', v: k.v }
    if (k.t === 'v') return { t: 'v', n: k.v }
    if (k.t === '(') { const e = expr(); if (!eat(')')) throw new Error('kurung belum tertutup'); return e }
    throw new Error('bentuk tidak dikenali')
  }
  const r = expr()
  if (p !== tokens.length) throw new Error('ada bagian yang tidak terbaca')
  return r
}

const ev = (a, env) => {
  switch (a.t) {
    case 'n': return a.v
    case 'v': return env[a.n] ?? 0
    case 'neg': return -ev(a.e, env)
    case 'p': return Math.pow(ev(a.e, env), a.k)
    default: { const l = ev(a.l, env), r = ev(a.r, env); return a.op === '+' ? l + r : a.op === '-' ? l - r : a.op === '*' ? l * r : l / r }
  }
}
const kumpul = (a, s) => { if (a.t === 'v') s.add(a.n); else { if (a.e) kumpul(a.e, s); if (a.l) kumpul(a.l, s); if (a.r) kumpul(a.r, s) } return s }

export function parseEq(str) {
  try {
    const parts = norm(str).split('=')
    if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, pesan: `"${str}" belum berbentuk persamaan (harus ada satu tanda =).` }
    const L = parse(tokenize(parts[0])), R = parse(tokenize(parts[1]))
    const vars = [...kumpul(R, kumpul(L, new Set()))]
    return { ok: true, vars, f: (env) => ev(L, env) - ev(R, env) }
  } catch (e) {
    return { ok: false, pesan: `"${str}" belum bisa dibaca: ${e.message}.` }
  }
}

// f(x,y) = c0 + a*x + b*y  ->  a*x + b*y = -c0
export function affine(eq, v1, v2) {
  const f = (x, y) => eq.f({ [v1]: x, [v2]: y })
  const c0 = f(0, 0)
  return [f(1, 0) - c0, f(0, 1) - c0, -c0]
}
export function linear(eq, v1, v2) {
  const f = (x, y) => eq.f({ [v1]: x, [v2]: y })
  const c0 = f(0, 0), a = f(1, 0) - c0, b = f(0, 1) - c0
  return [[2, 3], [-1, 4], [5, -2], [0.5, 7]].every(([x, y]) => {
    const v = f(x, y)
    return Number.isFinite(v) && Math.abs(v - (c0 + a * x + b * y)) <= 1e-6 * (1 + Math.abs(v))
  })
}
export function proporsional(u, w) {
  const nu = Math.hypot(...u), nw = Math.hypot(...w)
  if (nu < 1e-12 || nw < 1e-12) return false
  const cr = [u[0] * w[1] - u[1] * w[0], u[0] * w[2] - u[2] * w[0], u[1] * w[2] - u[2] * w[1]]
  return cr.every((c) => Math.abs(c) <= 1e-9 * nu * nw)
}
