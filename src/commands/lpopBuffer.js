import { lpop } from './lpop';

export function lpopBuffer(key) {
  return lpop.apply(this, [key]);
}
