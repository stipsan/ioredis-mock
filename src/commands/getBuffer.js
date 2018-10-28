import { get } from './get';

export function getBuffer(key) {
  return get.apply(this, [key]);
}
