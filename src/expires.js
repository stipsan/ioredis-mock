export default function createExpires() {
  const expires = {};

  return {
    get(key) {
      return expires[key];
    },
    set(key, timestamp) {
      expires[key] = +timestamp;
    },
    has(key) {
      return {}.hasOwnProperty.call(expires, key);
    },
    isExpired(key) {
      return expires[key] <= Date.now();
    },
    delete(key) {
      delete expires[key];
    },
  };
}
