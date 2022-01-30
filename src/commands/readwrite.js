export function readwrite() {
  return 'OK'
}

export function readwriteBuffer() {
  const val = readwrite.call(this)
  return val ? Buffer.from(val) : val
}
