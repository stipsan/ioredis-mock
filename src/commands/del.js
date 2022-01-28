import { emitNotification } from '../keyspace-notifications'

export function del(...keys) {
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
