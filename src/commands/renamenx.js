import { rename } from './rename';

export function renamenx(key, newKey) {
  if ({}.hasOwnProperty.call(this.data, newKey)) {
    return '0';
  }

  rename.call(this, key, newKey);

  return '1';
}
