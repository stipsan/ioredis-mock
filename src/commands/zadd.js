import Map from 'es6-map';

export function zadd(key, ...vals) {
  if (!this.data.has(key)) {
    this.data.set(key, new Map());
  }
  let added = 0;
  const map = this.data.get(key);
  for (let i = 0; i < vals.length; i += 2) {
    const score = vals[i];
    const value = vals[i + 1];
    if (!map.has(value)) {
      added++;
    }
    map.set(value, { score, value });
  }
  return added;
}
