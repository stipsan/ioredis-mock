export default function emitMessage(redisMock, channel, message) {
  process.nextTick(() => {
    redisMock.emit('message', channel, message);
  });
}
