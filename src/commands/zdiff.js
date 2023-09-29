import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { zrange } from './zrange'
import { zscore } from './zscore'

export function zdiff(numkeys, ...vals) {
  if (vals.length === 0) {
    throw new Error("ERR wrong number of arguments for 'zdiff' command")
  }

  const [keys, withScores] =
    vals[vals.length - 1] === 'WITHSCORES'
      ? [vals.slice(0, -1), true]
      : [vals, false]

  if (
    (Number.isInteger(numkeys) ? numkeys : parseInt(numkeys, 10)) !==
    keys.length
  ) {
    throw new Error(
      'ERR numkeys must match the number of keys. ' +
        `numkeys===${numkeys} keys but got ${keys.length} keys`
    )
  }

  const firstKeyMembers = zrange.call(this, keys[0], 0, -1)
  const otherMembers = new Set(
    keys
      .slice(1)
      .map(key => zrange.call(this, key, 0, -1))
      .flat()
  )

  const diffedMembers = firstKeyMembers.filter(
    member => !otherMembers.has(member)
  )

  if (!withScores) {
    return diffedMembers
  }

  return diffedMembers
    .map(member => [member, zscore.call(this, keys[0], member)])
    .flat()
}

export function zdiffBuffer(numkeys, ...vals) {
  const val = zdiff.apply(this, numkeys, vals)
  return convertStringToBuffer(val)
}
