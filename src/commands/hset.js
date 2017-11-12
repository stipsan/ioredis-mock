export function hset(key, hashKey, hashVal) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  let reply = 1;
  const hash = this.data.get(key);

  if ({}.hasOwnProperty.call(hash, hashKey)) {
    reply = 0;
  }

  hash[hashKey] = hashVal;

  this.data.set(key, hash);

  return reply;
}
