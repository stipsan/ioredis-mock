export function readonly() {
  throw new Error('ERR This instance has cluster support disabled')
}

export function readonlyBuffer() {
  const val = readonly.call(this)
  return val ? Buffer.from(val) : val
}
