import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function replicaof(host, port) {
  if (!host || !port) {
    throw new Error("ERR wrong number of arguments for 'replicaof' command")
  }

  if (host.toUpperCase() === 'NO' && port.toUpperCase() === 'ONE') {
    return 'OK'
  }

  throw new Error('ERR Unsupported operation, PRs welcome ;-)')
}

export function replicaofBuffer(...args) {
  const val = replicaof.apply(this, args)
  return convertStringToBuffer(val)
}

// As of Redis version 5 the Redis project doesn't use the word slave, but it's included for backwards compatibility
export const slaveof = replicaof
export const slaveofBuffer = replicaofBuffer
