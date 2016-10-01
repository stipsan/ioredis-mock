import { setExpire } from '../expires';

export function expire(key, seconds) {
  if (!{}.hasOwnProperty.call(this.data, key)) {
    return '0';
  }

  setExpire(key, (seconds * 1000) + Date.now());

  return '1';
}
