import Set from 'es6-set';
import Map from 'es6-map';
import { assign } from 'lodash';

import createBuffer from './buffer';

export default function createData(
  expiresInstance,
  initial = {},
  keyPrefix = ''
) {
  let raw = {};

  function createInstance(prefix, expires) {
    return Object.freeze({
      clear() {
        raw = {};
      },
      delete(key) {
        if (expires.has(key)) {
          expires.delete(key);
        }
        delete raw[`${prefix}${key}`];
      },
      get(key) {
        if (expires.has(key) && expires.isExpired(key)) {
          this.delete(key);
        }

        const value = raw[`${prefix}${key}`];

        if (Array.isArray(value)) {
          return value.slice();
        }

        if (Buffer.isBuffer(value)) {
          return createBuffer(value);
        }

        if (value instanceof Set) {
          return new Set(value);
        }

        if (value instanceof Map) {
          return new Map(value);
        }

        if (typeof value === 'object' && value) {
          return assign({}, value);
        }

        return value;
      },
      has(key) {
        if (expires.has(key) && expires.isExpired(key)) {
          this.delete(key);
        }

        return {}.hasOwnProperty.call(raw, `${prefix}${key}`);
      },
      keys() {
        return Object.keys(raw);
      },
      set(key, val) {
        let item = val;

        if (Array.isArray(val)) {
          item = val.slice();
        } else if (Buffer.isBuffer(val)) {
          item = createBuffer(val);
        } else if (val instanceof Set) {
          item = new Set(val);
        } else if (val instanceof Map) {
          item = new Map(val);
        } else if (typeof val === 'object' && val) {
          item = assign({}, val);
        }

        raw[`${prefix}${key}`] = item;
      },
      withKeyPrefix(newKeyPrefix) {
        if (newKeyPrefix === prefix) return this;
        return createInstance(
          newKeyPrefix,
          expires.withKeyPrefix(newKeyPrefix)
        );
      },
    });
  }

  const data = createInstance(keyPrefix, expiresInstance);

  Object.keys(initial).forEach((key) => data.set(key, initial[key]));

  return data;
}
