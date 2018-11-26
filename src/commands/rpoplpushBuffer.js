import { rpoplpush } from './rpoplpush';

export function rpoplpushBuffer(source, destination) {
  return rpoplpush.apply(this, [source, destination]);
}
