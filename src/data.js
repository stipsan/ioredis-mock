
export default function createData(expires, initial = {}) {
  const data = Object.freeze({
    raw: {},
    keys() {
      return Object.keys(this.raw);
    },
    get(key) {
      return this.raw[key];
    },
    set(key, val) {
      this.raw[key] = val;
    },
    has(key) {
      return this.raw.hasOwnProperty.call(this.raw, key);
    },
    delete(key) {
      delete this.raw[key];
    },
  });

  Object.keys(initial).forEach(key => data.set(key, initial[key]));

  return data;
}
