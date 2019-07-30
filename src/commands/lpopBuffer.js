import { lpop } from './lpop';
import createBuffer from '../buffer';

export function lpopBuffer(key) {
  const val = lpop.apply(this, [key]);
  return val ? createBuffer(val) : val;
}
