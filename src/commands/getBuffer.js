import { get } from './get';

export function getBuffer(key) {
  const val = get.apply(this, [key]);
  return val ? Buffer.from(val) : val;
}
