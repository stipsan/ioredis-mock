import { zrevrangebyscore } from './index';

export function zremrangebyscore(key, inputMin, inputMax) {
  const vals = zrevrangebyscore.call(this, key, inputMax, inputMin);

  if (!this.data.has(key)) {
    return 0; // Short circuit.
  }

  const map = this.data.get(key);
  vals.forEach(val => {
    map.delete(val);
  });
  this.data.set(key, map);

  return vals.length;
}
