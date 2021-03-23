import { hget } from './hget';

export function hgetBuffer(key, hashKey) {
  const val = hget.apply(this, [key, hashKey]);
  return val ? Buffer.from(val) : val;
}
