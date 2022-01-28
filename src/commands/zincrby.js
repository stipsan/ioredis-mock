export function zincrby(key, increment, value) {
  if (!this.data.has(key)) {
    this.data.set(key, new Map())
  }

  const map = this.data.get(key)
  let score = 0
  if (map.has(value)) {
    ;({ score } = map.get(value))
  }

  score += parseFloat(increment)
  map.set(value, { value, score })

  this.data.set(key, map)
  return score.toString()
}
