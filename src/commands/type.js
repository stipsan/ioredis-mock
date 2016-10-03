import { isArray, isPlainObject, isString } from 'lodash';

export function type(key) { // eslint-disable-line consistent-return
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
