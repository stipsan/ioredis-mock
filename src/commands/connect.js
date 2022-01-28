import emitConnectEvent from '../commands-utils/emitConnectEvent'

export function connect() {
  if (this.connected) {
    throw new Error('Redis is already connecting/connected')
  }
  this.connected = true
  emitConnectEvent(this)
  return undefined
}
