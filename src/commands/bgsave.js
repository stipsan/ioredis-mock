export function bgsave() {
  return 'Background saving started'
}

export function bgsaveBuffer() {
  const val = bgsave.apply(this, [])
  return val ? Buffer.from(val) : val
}
