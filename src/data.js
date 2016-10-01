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

      return raw[key];
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
