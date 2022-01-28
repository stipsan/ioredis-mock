export function flushdb() {
  this.flushall()
  return 'OK'
}

export function flushdbBuffer() {
  const val = flushdb.call(this)
  return val ? Buffer.from(val) : val
}
