import { mget } from './mget';
import createBuffer from '../buffer';

export function mgetBuffer(key, ...fields) {
  const val = mget.apply(this, [key, ...fields]);
  return val.map(payload => (payload ? createBuffer(payload) : payload));
}
