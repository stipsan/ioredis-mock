export function replconf() {
  return 'OK'
}

export function replconfBuffer() {
  const val = replconf.call(this)
  return val ? Buffer.from(val) : val
}
