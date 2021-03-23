

export function append(key, value) {
  if (!this.data.has(key)) {
    this.data.set(key, '');
  }
  if (value instanceof Buffer) {
    this.data.set(
      key,
      Buffer.concat([Buffer.from(this.data.get(key)), value])
    );
  } else {
    this.data.set(key, this.data.get(key) + value);
  }
  return this.data.get(key).length;
}
