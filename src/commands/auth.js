export function auth() {
  return 'OK'
}

export function authBuffer(...args) {
  const val = auth.apply(this, args)
  return val ? Buffer.from(val) : val
}
