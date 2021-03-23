import { hmget } from './hmget';

export function hmgetBuffer(key, ...fields) {
  const val = hmget.apply(this, [key, ...fields]);
  return val.map((payload) => (payload ? Buffer.from(payload) : payload));
}
