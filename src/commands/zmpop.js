import chunk from "lodash.chunk"
import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { zpopmin } from "./zpopmin"
import { zpopmax } from "./zpopmax"

export function zmpop(numKeysStr, ...vals) {
  if (vals.length < 2) {
    throw new Error("ERR wrong number of arguments for 'zmpop' command")
  }

  const numKeys = parseInt(numKeysStr, 10)
  if (numKeys < 1 || isNaN(numKeys)) {
    throw new Error("ERR count should be greater than 0")
  }

  const withCount = vals[vals.length - 2] === "COUNT"

  // numKeys (key * numKeys) (MIN|MAX) [COUNT count]
  if (vals.length !== numKeys + 1 + (withCount ? 2 : 0)) {
    throw new Error("ERR syntax error")
  }

  const count = withCount === true ? vals[vals.length - 1] : 1

  const minMax = vals[vals.length - (withCount ? 3 : 1)].toUpperCase()
  if (["MIN", "MAX"].includes(minMax) === false) {
    throw new Error("ERR syntax error")
  }

  const keys = vals.slice(0, numKeys)

  // zmpop is very similar to zpopmin/zpopmax, the main difference is that
  // it takes multiple keys and find the first non empty
  // we can simply use zpopmin/zpopmax and return the first non empty result
  const popFunc = (minMax === "MIN" ? zpopmin : zpopmax).bind(this)
  for (const key of keys) {
    const result = popFunc(key, count)
    if (result.length > 0) {
      return [
        key,
        chunk(result, 2)
      ]
    }
  }
  return null
}

export function zmpopBuffer(...args) {
  const val = zmpop.apply(this, args)
  return convertStringToBuffer(val)
}
