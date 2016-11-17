export function lrange(key, start, stop) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  const list = this.data.get(key) || [];

  if (start >= list.length) {
    return [];
  }

  const modStop = stop + 1;

  if (modStop >= list.length) {
    return list.slice(start);
  }

  return list.slice(start, modStop);
}
