export default function emitConnectEvent(redisMock) {
  process.nextTick(() => {
    redisMock.emit('end')
  })
}
