import { expire, set } from './index';

export function setex(key, seconds, value) {
  set.call(this, key, value);

  expire.call(this, key, seconds);

  return 'OK';
}
