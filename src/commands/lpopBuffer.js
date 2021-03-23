import { lpop } from './lpop';

export function lpopBuffer(key) {
  const val = lpop.apply(this, [key]);
  return val ? Buffer.from(val) : val;
}
