export function flushdb() {
  this.flushall();
  return 'OK';
}
