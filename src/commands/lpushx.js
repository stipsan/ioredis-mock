import { lpush } from './index'

export function lpushx(key, value) {
  if (!this.data.has(key)) {
    return 0
  }

  return lpush.call(this, key, value)
}

export const lpushxBuffer = lpushx
