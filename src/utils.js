import { isArray, isBuffer, isString } from 'lodash';

export function bufsToString(value) {
  if (isBuffer(value)) {
    return value.toString();
  }
  if (isArray(value)) {
    return value.map(val => isBuffer(val) ? val.toString() : val);
  }
  return value;
}

export function nonBufsToString(values) {
  return values.map(value => isBuffer(value) ? value : value && value.toString());
}

export function stringsToBuf(value) {
  if (isString(value)) {
    return Buffer.from(value);
  }
  if (isArray(value)) {
    return value.map(val => isString(val) ? Buffer.from(val) : val);
  }
  return value;
}
