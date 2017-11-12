import arrayFrom from 'array-from';

export function smembers(key) {
  if (!this.data.has(key)) {
    return []
  }

  return arrayFrom(this.data.get(key));
}
