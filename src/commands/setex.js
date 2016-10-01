import { expire } from './expire';
import { set } from './set';

export function setex(key, seconds, value) {
  set.call(this, key, value);

  expire.call(this, key, seconds);

  return 'OK';
}
