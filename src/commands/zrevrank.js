import { zrevrange } from './zrevrange'

export function zrevrank(key, member) {
  const vals = zrevrange.call(this, key, 0, -1)
  const idx = vals.indexOf(member)
  return idx >= 0 ? idx : null
}

export const zrevrankBuffer = zrevrank
