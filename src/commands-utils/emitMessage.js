export default function emitMessage(redisMock, channel, message, pattern) {
  process.nextTick(() => {
    if (pattern) {
      redisMock.emit(
        Buffer.isBuffer(message) ? 'pmessageBuffer' : 'pmessage',
        pattern,
        channel,
        message
      )
    } else {
      redisMock.emit(
        Buffer.isBuffer(message) ? 'messageBuffer' : 'message',
        channel,
        message
      )
    }
  })
}
