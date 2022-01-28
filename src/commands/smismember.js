export function smismember(key, ...valArray) {
  const data = this.data.get(key);

  if (data) {
    return valArray.map((val) => (data.has(val) ? 1 : 0));
  }
  return valArray.map(() => 0);
}
