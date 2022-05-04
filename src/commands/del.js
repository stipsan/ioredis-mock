import { emitNotification } from '../keyspace-notifications'

export function del(...keys) {
  if (keys.length === 0 || !keys[0]) {
    throw new Error("ERR wrong number of arguments for 'del' command")
  }

  let deleted = 0
  keys.forEach(key => {
    if (this.data.has(key)) {
      deleted++
      emitNotification(this, 'g', key, 'del')
    }
    this.data.delete(key)
  })
  return deleted
}

export const delBuffer = del
