export default function emitMessage(redisMock, channel, message, pattern) {
  process.nextTick(() => {
    const [patternEvent, regularEvent, channelToEmit] = Buffer.isBuffer(message)
      ? ['pmessageBuffer', 'messageBuffer', Buffer.from(channel)]
      : ['pmessage', 'message', channel]
    if (pattern) {
      redisMock.emit(patternEvent, pattern, channelToEmit, message)
    } else {
      redisMock.emit(regularEvent, channelToEmit, message)
    }
  })
}
