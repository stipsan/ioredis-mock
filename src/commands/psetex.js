import { pexpire } from './pexpire';
import { set } from './set';

export function psetex(key, milliseconds, value) {
  set.call(this, key, value);

  pexpire.call(this, key, milliseconds);

  return 'OK';
}
