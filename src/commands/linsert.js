export function linsert(key, position, pivot, element) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  const list = this.data.get(key) || []
  const pivotIndex = list.indexOf(pivot)
  if (pivotIndex < 0) return -1
  let elementIndex = pivotIndex
  switch (position) {
    case 'BEFORE':
      elementIndex = pivotIndex
      break
    case 'AFTER':
      elementIndex = pivotIndex + 1
      break
    default:
      throw new Error(
        'The position of the new element must be BEFORE the pivot or AFTER the pivot'
      )
  }
  list.splice(elementIndex, 0, element)
  const { length } = list
  this.data.set(key, list)
  return length
}
