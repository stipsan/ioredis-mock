export function discard() {
  if (!this.batch) {
      throw new ReplyError('ERR DISCARD without MULTI');
  }
  this.batch = undefined;
  return 'OK';
}
