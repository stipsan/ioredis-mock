export function hkeys(key) {
  return this.data.has(key) ? Object.keys(this.data.get(key)) : []
}

export function hkeysBuffer(globString) {
  const vals = hkeys.call(this, globString)
  return vals.map(Buffer.from)
}
