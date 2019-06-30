import { hgetall } from './hgetall';
import createBuffer from '../buffer';

export function hgetallBuffer(key) {
  const val = hgetall.apply(this, [key]);
  Object.entries(val).forEach(([keyInObject, payload]) => {
    val[keyInObject] = createBuffer(payload);
  });
  return val;
}
