import { brpoplpush } from './brpoplpush';

export function brpoplpushBuffer(source, destination) {
  const valP = brpoplpush.apply(this, [source, destination]);
  return valP.then((val) => (val ? Buffer.from(val) : val));
}
