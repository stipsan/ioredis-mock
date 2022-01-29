export function save() {
  return 'OK'
}

export function saveBuffer() {
  const val = save.call(this)
  return val ? Buffer.from(val) : val
}
