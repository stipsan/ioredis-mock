import { rename } from './rename';

export function renamenx(key, newKey) {
  if (this.data.has(newKey)) {
    return '0';
  }

  rename.call(this, key, newKey);

  return '1';
}
