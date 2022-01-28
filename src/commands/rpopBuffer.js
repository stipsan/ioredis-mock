import { rpop } from './rpop'

export function rpopBuffer(key) {
  return rpop.apply(this, [key])
}
