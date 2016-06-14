export function sadd(key, ...vals) {
  return new Promise(resolve => {
    if (!this.data.hasOwnProperty(key)) {
      this.data[key] = [];
    }
    this.data[key].push(...vals);
    resolve(vals.length);
  });
}
