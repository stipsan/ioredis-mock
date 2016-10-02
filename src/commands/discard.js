export function discard() {
  this.batch.length = 0;

  return 'OK';
}
