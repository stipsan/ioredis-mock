export function brpoplpush(source, destination, timeout) {
  return this.rpoplpush(source, destination);
}
