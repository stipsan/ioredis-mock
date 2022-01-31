export function setrange(key, offset, value) {
  const oldVal = this.data.get(key) || ''
  const start = parseInt(offset, 10)
  const end = parseInt(start + value.length, 10)

  let newVal = ''
  if (start > 0) {
    newVal = oldVal.slice(0, start)
  }

  newVal += value

  if (end < oldVal.length) {
    newVal += oldVal.slice(end, oldVal.length + 1)
  }

  if (newVal.length < end) {
    newVal = newVal.padStart(end, String.fromCharCode(0))
  }

  this.data.set(key, newVal)

  return newVal.length
}

export const setrangeBuffer = setrange
