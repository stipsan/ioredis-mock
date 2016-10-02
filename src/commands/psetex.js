import { pexpire, set } from './index';

export function psetex(key, milliseconds, value) {
  set.call(this, key, value);

  pexpire.call(this, key, milliseconds);

  return 'OK';
}
