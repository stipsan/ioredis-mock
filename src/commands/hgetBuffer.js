import { hget } from './hget';
import createBuffer from '../buffer';

export function hgetBuffer(key, hashKey) {
  const val = hget.apply(this, [key, hashKey]);
  return val ? createBuffer(val) : val;
}
