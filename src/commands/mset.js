import { set } from './index'

export function mset(...msetData) {
  for (let i = 0; i < msetData.length; i += 2) {
    set.call(this, msetData[i], msetData[i + 1])
  }

  return 'OK'
}

export function msetBuffer(...args) {
  const val = mset.apply(this, args)
  return val ? Buffer.from(val) : val
}
