import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function lpop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  const list = this.data.get(key) || []

  if (list.length === 0) {
    return null
  }

  if (count) {
    const items = list.slice(0, count)
    const remainingItems = list.slice(count)

    if (remainingItems.length > 0) {
      this.data.set(key, remainingItems)
    } else {
      this.data.delete(key)
    }

    return items
  }

  const item = list.shift()

  if (list.length > 0) {
    this.data.set(key, list)
  } else {
    this.data.delete(key)
  }

  return item
}

export function lpopBuffer(key, count) {
  const val = lpop.apply(this, [key, count])
  return convertStringToBuffer(val)
}
