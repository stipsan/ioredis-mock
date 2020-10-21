import { zrange } from './index';

export function zremrangebyrank(key, s, e) {
  const vals = zrange.call(this, key, s, e);

  if (!this.data.has(key)) {
    return 0; // Short circuit.
  }

  const map = this.data.get(key);
  vals.forEach((val) => {
    map.delete(val);
  });

  this.data.set(key, map);
  return vals.length;
}
