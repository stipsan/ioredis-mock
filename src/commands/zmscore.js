import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function zmscore(key, ...members) {
  const map = this.data.get(key)

  // @TODO investigate a more stable way to detect sorted lists
  if (!map || !(map instanceof Map)) {
    return Array(members.length).fill(null)
  }

  return members.map(member => {
    const entry = map.get(member)

    if (!entry) {
      return null
    }

    return entry.score.toString()
  })
}

export function zmscoreBuffer(...args) {
  const val = zmscore.apply(this, args)
  return convertStringToBuffer(val)
}
