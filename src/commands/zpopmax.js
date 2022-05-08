import orderBy from 'lodash.orderby'

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { slice } from './zrange-command.common'

export function zpopmax(key, count = 1) {
  const map = this.data.get(key)

  if (map == null || !(map instanceof Map)) {
    return []
  }

  const ordered = slice(
    orderBy(Array.from(map.values()), ['score', 'value']),
    -count,
    -1
  ).reverse()

  ordered.forEach(it => {
    map.delete(it.value)
  })
  this.data.set(key, map)

  return ordered.flatMap(it => [it.value, it.score])
}

export function zpopmaxBuffer(...args) {
  const val = zpopmax.apply(this, args)
  return convertStringToBuffer(val)
}
