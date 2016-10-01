export function hmget(key, ...fields) {
  return fields.map(field => this.data.get(key)[field] || null);
}
