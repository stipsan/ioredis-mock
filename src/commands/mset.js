import { set } from './index'

export function mset(...msetData) {
  for (let i = 0; i < msetData.length; i += 2) {
    set.call(this, msetData[i], msetData[i + 1])
  }

  return 'OK'
}

export function msetBuffer(...msetData) {
  const val = mset.apply(this, msetData)
  return val ? Buffer.from(val) : val
}
