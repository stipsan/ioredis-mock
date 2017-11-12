export function hmset(key, ...hmsetData) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  const hash = this.data.get(key);

  for (let i = 0; i < hmsetData.length; i += 2) {
    hash[hmsetData[i]] = hmsetData[i + 1];
  }

  this.data.set(key, hash);

  return 'OK';
}
