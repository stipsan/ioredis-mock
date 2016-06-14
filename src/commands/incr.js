export function incr(key) {
  return new Promise(resolve => {
    const curVal = Number(this.data[key]);
    this.data[key] = curVal + 1;
    resolve(this.data[key].toString());
  });
}
