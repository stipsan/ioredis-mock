import { hmget } from './hmget';
import createBuffer from '../buffer';

export function hmgetBuffer(key, ...fields) {
  const val = hmget.apply(this, [key, ...fields]);
  return val.map((payload) => (payload ? createBuffer(payload) : payload));
}
