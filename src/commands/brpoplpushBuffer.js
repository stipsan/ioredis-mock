import { brpoplpush } from './brpoplpush';
import createBuffer from '../buffer';

export function brpoplpushBuffer(source, destination) {
  const valP = brpoplpush.apply(this, [source, destination]);
  return valP.then((val) => (val ? createBuffer(val) : val));
}
