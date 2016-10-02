import { rpush } from './index';

export function rpushx(key, value) {
  if (!this.data.has(key)) {
    return '0';
  }

  return rpush.call(this, key, value);
}
