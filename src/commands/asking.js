export function asking() {
  throw new Error('ERR This instance has cluster support disabled')
}

export function askingBuffer() {
  const val = asking.call(this)
  return val ? Buffer.from(val) : val
}
