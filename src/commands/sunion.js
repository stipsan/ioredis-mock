import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function sunion(...keys) {
  keys.forEach(key => {
    if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
      throw new Error(
        'WRONGTYPE Operation against a key holding the wrong kind of value'
      )
    }
  })

  const sets = keys.map(key =>
    this.data.has(key) ? this.data.get(key) : new Set()
  )
  const union = new Set(
    sets.reduce((combined, set) => [...combined, ...Array.from(set)], [])
  )

  return Array.from(union)
}

export function sunionBuffer(...args) {
  const val = sunion.apply(this, args)
  return convertStringToBuffer(val)
}
