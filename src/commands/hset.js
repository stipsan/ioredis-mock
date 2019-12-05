export function hset(key, ...args) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  let reply = 0;
  const hash = this.data.get(key);
  for (let i = 0; i < args.length; i += 2) {
    if (!{}.hasOwnProperty.call(hash, args[i])) reply++;
    hash[args[i]] = args[i + 1];
  }

  this.data.set(key, hash);

  return reply;
}
