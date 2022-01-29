export function ping(message = 'PONG') {
  return message
}

export function pingBuffer(message) {
  const val = ping.call(this, message)
  return val ? Buffer.from(val) : val
}
