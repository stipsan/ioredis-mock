const expires = {};

export function setExpire(key, timestamp) {
  expires[key] = timestamp;
}

export function isExpired(key) {
  return expires[key] >= (Date.now() / 1000);
}

export function getExpire(key) {
  return expires[key];
}
