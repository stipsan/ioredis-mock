export function lmove(listKey1, listKey2, position1, position2) {
  if (this.data.has(listKey1) && !(this.data.get(listKey1) instanceof Array)) {
    throw new Error(
      'WRONGTYPE Operation against a key holding the wrong kind of value'
    )
  }
  if (this.data.has(listKey2) && !(this.data.get(listKey2) instanceof Array)) {
    throw new Error(
      'WRONGTYPE Operation against a key holding the wrong kind of value'
    )
  }

  if (position1 !== 'LEFT' && position1 !== 'RIGHT') {
    throw new Error("Position1 argument must be 'LEFT' or 'RIGHT'")
  }
  if (position2 !== 'LEFT' && position2 !== 'RIGHT') {
    throw new Error("Position2 argument must be 'LEFT' or 'RIGHT'")
  }

  const list1 = this.data.get(listKey1) || []
  let list2 = list1 // Operate on the same list
  if (listKey1 !== listKey2) {
    // Operate on two different lists
    list2 = this.data.get(listKey2) || []
  }

  if (list1.length === 0) {
    return null
  }

  let value
  if (position1 === 'LEFT') {
    value = list1.shift()
  } else {
    value = list1.pop()
  }

  if (position2 === 'LEFT') {
    list2.unshift(value)
  } else {
    list2.push(value)
  }

  this.data.set(listKey1, list1)
  if (listKey2 !== listKey1) {
    this.data.set(listKey2, list2)
  }

  return value
}
