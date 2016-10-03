import arrayFrom from 'array-from';

export function smembers(key) {
  return arrayFrom(this.data.get(key));
}
