export function xadd(stream, id, ...args) {
  if (
    !stream ||
    !id ||
    args.length === 0 ||
    ((args.includes('~') || (args.includes('='))) ? args.length < 4 : args.length % 2 !== 0)
  ) {
    throw new Error("ERR wrong number of arguments for 'xadd' command")
  }
  if (!this.data.has(stream)) {
    this.data.set(stream, [])
  }
  
  let threshold;
  if (id === 'MAXLEN') {
    threshold = args.shift();
    if (threshold === '=' || threshold === '~') {
      threshold = args.shift();
    }
    id = args.shift();
  }

  const eventId = `${id === '*' ? this.data.get(stream).length + 1 : id}-0`
  const list = this.data.get(stream)

  if (list.length > 0 && list[0][0] === `${eventId}`) {
    throw new Error(
      'ERR The ID specified in XADD is equal or smaller than the target stream top item'
    )
  }

  this.data.set(`stream:${stream}:${eventId}`, { polled: false })

  let newData = list.concat([[`${eventId}`, [...args]]]);
  if (threshold && newData.length > threshold) {
    newData = newData.slice(-threshold);
  }
  this.data.set(stream, newData);
  return `${eventId}`
}
