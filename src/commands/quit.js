export function quit() {
  this.disconnect()
  return 'OK'
}

export function quitBuffer() {
  const val = quit.call(this)
  return val ? Buffer.from(val) : val
}
