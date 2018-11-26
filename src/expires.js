export default function createExpires(keyPrefix = '') {
  const expires = {};
  const prefix = keyPrefix;

  return {
    get(key) {
      return expires[`${prefix}${key}`];
    },
    set(key, timestamp) {
      expires[`${prefix}${key}`] = +timestamp;
    },
    has(key) {
      return {}.hasOwnProperty.call(expires, `${prefix}${key}`);
    },
    isExpired(key) {
      return expires[`${prefix}${key}`] <= Date.now();
    },
    delete(key) {
      delete expires[`${prefix}${key}`];
    },
  };
}
