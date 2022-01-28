export function flushall() {
  this.expires.clear()
  this.data.clear()

  return 'OK'
}
