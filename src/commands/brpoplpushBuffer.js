export function brpoplpushBuffer(source, destination) {
  return this.brpoplpush(source, destination);
}
