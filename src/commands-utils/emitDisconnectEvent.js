export default function emitConnectEvent(redisMock) {
  process.nextTick(() => {
    redisMock.emit('close')
    redisMock.emit('end')
  })
}
