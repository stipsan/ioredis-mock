export function getrange(key, start, end) {
  const val = this.data.get(key);

  if (end === -1) {
    return val.slice(start);
  }

  return val.slice(start, end + 1);
}
