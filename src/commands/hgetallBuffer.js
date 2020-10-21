import { hgetall } from './hgetall';
import createBuffer from '../buffer';

export function hgetallBuffer(key) {
  const val = hgetall.apply(this, [key]);
  Object.keys(val).forEach((keyInObject) => {
    val[keyInObject] = createBuffer(val[keyInObject]);
  });

  return val;
}
