export function echo(message) {
  return message
}

export function echoBuffer(message) {
  const val = echo.call(this, message)
  return val ? Buffer.from(val) : val
}
