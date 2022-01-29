export function flushall() {
  this.expires.clear()
  this.data.clear()

  return 'OK'
}

export function flushallBuffer() {
  const val = flushall.call(this)
  return val ? Buffer.from(val) : val
}
