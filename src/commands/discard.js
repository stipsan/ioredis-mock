export function discard() {
  if (!this.batch) {
    throw new Error('ERR DISCARD without MULTI')
  }
  this.batch = undefined
  return 'OK'
}

export function discardBuffer() {
  const val = discard.call(this)
  return val ? Buffer.from(val) : val
}
