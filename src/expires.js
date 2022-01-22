export function createSharedExpires() {
  const expires = {};

  return Object.freeze({
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
  });
}

export function createExpires(sharedExpires, keyPrefix = '') {
  function createInstance(prefix) {
    return {
      get: (key) => sharedExpires.get(`${prefix}${key}`),
      set: (key, timestamp) => sharedExpires.set(`${prefix}${key}`, timestamp),
      has: (key) => sharedExpires.has(`${prefix}${key}`),
      isExpired: (key) => sharedExpires.isExpired(`${prefix}${key}`),
      delete: (key) => sharedExpires.delete(`${prefix}${key}`),
      withKeyPrefix(newPrefix) {
        if (newPrefix === prefix) return this;
        return createInstance(newPrefix);
      },
    };
  }

  return createInstance(keyPrefix);
}
