import Set from 'es6-set';
import { isArray, isPlainObject, isString } from 'lodash';

// eslint-disable-next-line consistent-return
export function type(key) {
  if (!this.data.has(key)) {
    return 'none';
  }

  const val = this.data.get(key);

  if (val instanceof Set) {
    return 'set';
  }

  if (isArray(val)) {
    return 'list';
  }

  if (isString(val)) {
    return 'string';
  }

  if (isPlainObject(val)) {
    return 'hash';
  }
}
