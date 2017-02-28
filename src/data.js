import { assign } from 'lodash';

import createBuffer from './buffer';

export default function createData(expires, initial = {}) {
  let raw = {};
  const data = Object.freeze({
    clear() {
      raw = {};
    },
    delete(key) {
      if (expires.has(key)) {
        expires.delete(key);
      }

      delete raw[key];
    },
    get(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      const value = raw[key];

      if (Array.isArray(value)) {
        return value.slice();
      }

      if (Buffer.isBuffer(value)) {
        return createBuffer(value);
      }

      if (value instanceof Set) {
        return new Set(value);
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

      return {}.hasOwnProperty.call(raw, key);
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
      } else if (typeof val === 'object' && val) {
        item = assign({}, val);
      }

      raw[key] = item;
    },
  });

  Object.keys(initial).forEach(key => data.set(key, initial[key]));

  return data;
}
