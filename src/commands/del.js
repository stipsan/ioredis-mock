export function del(...keys) {
  let deleted = 0;
  keys.forEach(key => {
    if (this.data.has(key)) {
      deleted++;
    }
    this.data.delete(key);
  });
  return deleted;
}
