export function del(...keys) {
  keys.forEach((key) => {
    this.data[key] = undefined;
  });
  return keys.length;
}
