export function hvals(key) {
  if (!this.data.has(key)) {
    return [];
  }

  return Object.values(this.data.get(key));
}
