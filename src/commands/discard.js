export function discard() {
  if (!this.batch) {
    throw new Error('ERR DISCARD without MULTI')
  }
  this.batch = undefined
  return 'OK'
}
