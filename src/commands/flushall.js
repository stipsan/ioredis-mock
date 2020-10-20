import contextMap, { createContext } from '../context';
import { createData } from '../data';
import { createExpires } from '../expires';

export function flushall() {
  const oldContext = contextMap.get(this.keyData);
  const newContext = createContext(oldContext.keyPrefix);

  contextMap.set(this.keyData, newContext);

  this.expires = createExpires(newContext.expires, newContext.keyPrefix);
  this.data = createData(
    newContext.data,
    this.expires,
    {},
    newContext.keyPrefix
  );

  return 'OK';
}
