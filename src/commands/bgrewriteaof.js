export function bgrewriteaof() {
  return 'Background append only file rewriting started'
}

export function bgrewriteaofBuffer() {
  const val = bgrewriteaof.apply(this, [])
  return val ? Buffer.from(val) : val
}
