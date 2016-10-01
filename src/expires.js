export default function createExpires() {
  const expires = {};

  return {
    setExpire(key, timestamp) {
      expires[key] = timestamp;
    },
    isExpired(key) {
      return expires[key] >= (Date.now() / 1000);
    },
    getExpire(key) {
      return expires[key];
    },
  };
}
