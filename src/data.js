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
        return Buffer.from(value);
      }

      if (value instanceof Set) {
        return new Set(value);
      }

      if (typeof value === 'object' && value) {
        return Object.assign({}, value);
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
      raw[key] = val;
    },
  });

  Object.keys(initial).forEach(key => data.set(key, initial[key]));

  return data;
}
