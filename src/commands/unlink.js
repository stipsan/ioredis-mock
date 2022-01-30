import { del } from './del'

export function unlink(...keys) {
  const removeKeys = del.bind(this)
  return removeKeys(...keys)
}

export const unlinkBuffer = unlink
