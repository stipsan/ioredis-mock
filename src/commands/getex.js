import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { expire, expireat, get, persist, pexpire, pexpireat } from './index'

export function getex(key, _optionKey, optionValue) {
  const optionKey = _optionKey?.toUpperCase()
  const isOptionWithValue =
    ['EX', 'PX', 'EXAT', 'PXAT'].indexOf(optionKey) !== -1
  const validOptionWithValue = isOptionWithValue && optionValue !== undefined
  const validPersist = optionKey === 'PERSIST' && optionValue === undefined
  if (!validOptionWithValue && !validPersist && optionKey) {
    throw new Error('ERR syntax error')
  }

  if (!this.data.has(key)) return null

  // eslint-disable-next-line default-case
  switch (optionKey) {
    case 'PERSIST':
      persist.call(this, key)
      break
    case 'EX':
      expire.call(this, key, optionValue)
      break
    case 'PX':
      pexpire.call(this, key, optionValue)
      break
    case 'EXAT':
      expireat.call(this, key, optionValue)
      break
    case 'PXAT':
      pexpireat.call(this, key, optionValue)
      break
  }

  return get.call(this, key)
}

export function getexBuffer(...args) {
  const val = getex.apply(this, args)
  return convertStringToBuffer(val)
}
