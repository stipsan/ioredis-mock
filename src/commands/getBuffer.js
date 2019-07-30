import { get } from './get';
import createBuffer from '../buffer';

export function getBuffer(key) {
  const val = get.apply(this, [key]);
  return val ? createBuffer(val) : val;
}
