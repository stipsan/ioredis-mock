export function role() {
  return ['master', 0]
}

export function roleBuffer() {
  const val = role.call(this)
  return val.map(payload => (payload ? Buffer.from(payload) : payload))
}
