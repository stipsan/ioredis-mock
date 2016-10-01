
export default function createData(expires, initial = {}) {
  const raw = {};
  const data = Object.freeze({
    keys() {
      return Object.keys(raw);
    },
    get(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      return raw[key];
    },
    set(key, val) {
      raw[key] = val;
    },
    has(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      return {}.hasOwnProperty.call(raw, key);
    },
    delete(key) {
      if (expires.has(key)) {
        expires.delete(key);
      }

      delete raw[key];
    },
  });

  Object.keys(initial).forEach(key => data.set(key, initial[key]));

  return data;
}
