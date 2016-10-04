export function hmset(key, ...hmsetData) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  for (let i = 0; i < hmsetData.length; i += 2) {
    this.data.get(key)[hmsetData[i]] = hmsetData[i + 1];
  }

  return 'OK';
}
