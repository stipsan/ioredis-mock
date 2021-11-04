export function smismember(key, ...valArray) {
  const data = this.data.get(key);

  if (data) {
    return valArray.map((val) => {
      return data.has(val) ? 1 : 0;
    })
  }
  return valArray.map((val) => 0);
}