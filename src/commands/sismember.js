export function sismember(key, val) {
  const data = this.data.get(key);

  if (data) {
    return data.has(val) ? 1 : 0;
  }

  return 0;
}
