import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function xadd(stream, id, ...args) {
  if (
    !stream ||
    !id ||
    args.length === 0 ||
    (args.includes('~') || args.includes('=')
      ? args.length < 4
      : args.length % 2 !== 0)
  ) {
    throw new Error("ERR wrong number of arguments for 'xadd' command")
  }
  if (!this.data.has(stream)) {
    this.data.set(stream, [])
  }

  let threshold
  let keyId = id
  if (keyId === 'MAXLEN') {
    threshold = args.shift()
    if (threshold === '=' || threshold === '~') {
      threshold = args.shift()
    }
    keyId = args.shift()
  }

  const list = this.data.get(stream)
  // Last timestamp is relevant for auto generating valid ids
  let lastTimestamp = 0
  let lastCounter = 0
  if (list.length > 0) {
    ;[lastTimestamp, lastCounter] = list[list.length - 1][0].split('-')
  }

  let [unixTimestamp, counter] = keyId.split('-')
  if (unixTimestamp === '*') {
    unixTimestamp =
      Number(lastTimestamp) > Date.now() ? Number(lastTimestamp) : Date.now()
  }
  if (counter === undefined || counter === '*') {
    counter =
      Number(lastTimestamp) === Number(unixTimestamp)
        ? Number(lastCounter) + 1
        : 0
  }

  const sequentialIdProvided =
    Number(unixTimestamp) > Number(lastTimestamp) ||
    (Number(unixTimestamp) === Number(lastTimestamp) &&
      Number(counter) >= Number(lastCounter))
  if (!sequentialIdProvided) {
    throw new Error(
      'ERR The ID specified in XADD is equal or smaller than the target stream top item'
    )
  }

  const eventId = `${unixTimestamp}-${counter}`
  this.data.set(`stream:${stream}:${eventId}`, {
    polled: false,
  })

  let newData = list.concat([[`${eventId}`, [...args]]])
  if (threshold && newData.length > threshold) {
    newData = newData.slice(-threshold)
  }
  this.data.set(stream, newData)
  return `${eventId}`
}

export function xaddBuffer(...args) {
  const val = xadd.apply(this, args)
  return convertStringToBuffer(val)
}
