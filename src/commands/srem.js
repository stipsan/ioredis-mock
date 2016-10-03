export function srem(key, ...vals) {
  let removed = 0;
  const set = this.data.get(key);
  vals.forEach((val) => {
    if (set.has(val)) {
      removed++;
    }
    set.delete(val);
  });
  return removed;
}
