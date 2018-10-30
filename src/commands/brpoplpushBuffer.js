import { brpoplpush } from './brpoplpush';

export function brpoplpushBuffer(source, destination) {
  return brpoplpush.apply(this, [source, destination]);
}
