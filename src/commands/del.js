export function del(...keys) {
  keys.forEach(key => {
    this.data.delete(key);
  });
  return keys.length;
}
