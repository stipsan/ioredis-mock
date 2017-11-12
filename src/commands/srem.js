export function srem(key, ...vals) {
  if (!this.data.has(key)) {
    return 0
  }

  let removed = 0;
  const set = this.data.get(key);
  vals.forEach((val) => {
    if (set.has(val)) {
      removed++;
    }
    set.delete(val);
  });
  this.data.set(key, set);
  return removed;
}
