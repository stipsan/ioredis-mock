export function incrbyfloat(key, increment) {
  if (!this.data.has(key)) {
    this.data.set(key, '0')
  }
  const curVal = parseFloat(this.data.get(key))
  this.data.set(key, (curVal + parseFloat(increment)).toString())
  return this.data.get(key)
}

export const incrbyfloatBuffer = incrbyfloat
