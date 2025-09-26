import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function watch(...keys) {
  if (!this.dirty) {
    for (const key of keys) {
      this.watching.add(key)
    }
  }

  return 'OK'
}

export function watchBuffer(...keys) {
  const val = watch.apply(this, keys)
  return convertStringToBuffer(val)
}
