import { ReplyError } from 'redis-errors'

export function decrby(key, decrement) {
  if (decrement === undefined) {
    throw new ReplyError("ERR wrong number of arguments for 'decrby' command")
  }

  if (!this.data.has(key)) {
    this.data.set(key, '0')
  }
  const curVal = Number(this.data.get(key))
  const nextVal = curVal - parseInt(decrement, 10)
  this.data.set(key, nextVal.toString())
  return nextVal
}
