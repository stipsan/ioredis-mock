import { EventEmitter } from 'events'

import { createSharedData } from './data'
import { createSharedExpires } from './expires'

const contextMap = new Map()

export default contextMap

export function createContext(keyPrefix) {
  const expires = createSharedExpires()
  const modifiedKeyEvents = new EventEmitter()

  return {
    channels: new EventEmitter(),
    expires,
    data: createSharedData(expires, modifiedKeyEvents),
    patternChannels: new EventEmitter(),
    keyPrefix,
    modifiedKeyEvents,
  }
}
