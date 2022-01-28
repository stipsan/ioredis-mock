export default function emitConnectEvent(redisMock) {
  process.nextTick(() => {
    redisMock.emit('connect')
    redisMock.emit('ready')
  })
}
