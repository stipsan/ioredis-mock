export function getBuffer(key) {
  return this.data.has(key) ? Buffer.from(this.data.get(key)) : null;
}
