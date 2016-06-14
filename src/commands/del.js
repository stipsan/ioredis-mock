export function del(...keys) {
  keys.forEach(key => {
    delete this.data[key];
  });
  return keys.length;
}
