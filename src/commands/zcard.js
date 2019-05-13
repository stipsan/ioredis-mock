import Map from 'es6-map';

export function zcard(key) {
  const map = this.data.get(key);
  if (!map) {
    return 0;
  }
  if (!(map instanceof Map)) {
    throw new Error(`Key ${key} does not contain a sorted set`);
  }
  return this.data.get(key).size;
}
