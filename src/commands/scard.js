import Set from 'es6-set';

export function scard(key) {
  const set = this.data.get(key);
  if (!set) {
    return 0;
  }
  if (!(set instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  return this.data.get(key).size;
}
