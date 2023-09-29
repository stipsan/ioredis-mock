export function zadd(key, ...vals) {
  // consume options
  const options = []
  while (['NX', 'XX', 'GT', 'LT', 'CH', 'INCR'].includes(vals[0])) {
    options.push(vals.shift())
  }

  // make sure we have the correct number of args
  const elems = vals.length
  if (elems % 2 !== 0 || elems < 1) throw new Error('ERR syntax error')

  // set option vals
  const nx = options.includes('NX')
  const xx = options.includes('XX')
  const gt = options.includes('GT')
  const lt = options.includes('LT')
  const ch = options.includes('CH')
  const incr = options.includes('INCR')

  // validate options
  if (nx && xx)
    throw new Error('XX and NX options at the same time are not compatible')
  if (gt && lt)
    throw new Error('GT and LT options at the same time are not compatible')
  if (incr && elems > 2)
    throw new Error('INCR option supports a single increment-element pair')

  if (!this.data.has(key)) {
    if (xx) return 0
    this.data.set(key, new Map())
  }

  const map = this.data.get(key)

  let added = 0
  let updated = 0
  for (let i = 0; i < elems; i += 2) {
    let score = Number(vals[i])
    const value = vals[i + 1]

    if (map.has(value)) {
      if (!nx) {
        const exist = map.get(value)
        if (incr) {
          score += Number(exist.score)
        }
        if (lt && score >= exist.score || gt && score <= exist.score) {
          // null if INCR and we don't update
          if(incr) return null
          // eslint-disable-next-line no-continue
          continue
        }
        map.set(value, { score, value })
        updated++
      }

      // noop when nx
    } else if (!xx) {
      map.set(value, { score, value })
      added++
    }

    // if INCR return value is the new score as a string
    if(incr) {
      return `${score}`
    }
  }

  this.data.set(key, map)
  return ch ? added + updated : added
}

export const zaddBuffer = zadd
