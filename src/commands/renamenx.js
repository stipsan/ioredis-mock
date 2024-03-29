import { rename } from './index'

export function renamenx(key, newKey) {
  if (this.data.has(newKey)) {
    return 0
  }

  rename.call(this, key, newKey)

  return 1
}

export const renamenxBuffer = renamenx
