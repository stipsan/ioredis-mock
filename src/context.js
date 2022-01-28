import { EventEmitter } from 'events';

import { createSharedData } from './data';
import { createSharedExpires } from './expires';

const contextMap = new Map();

export default contextMap;

export function createContext(keyPrefix) {
  const expires = createSharedExpires();

  return {
    channels: new EventEmitter(),
    expires,
    data: createSharedData(expires),
    patternChannels: new EventEmitter(),
    keyPrefix,
  };
}
