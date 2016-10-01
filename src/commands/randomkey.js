import { random } from 'lodash';

export function randomkey() {
  const keys = this.data.keys();
  return keys.length > 0 ? keys[random(0, keys.length - 1)] : null;
}
