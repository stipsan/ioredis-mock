export function smembers(key) {
  if (!this.data.has(key)) {
    return [];
  }

  return Array.from(this.data.get(key));
}
