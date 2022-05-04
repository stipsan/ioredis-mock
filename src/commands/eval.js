import createCommand from '../command'
import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import sha1 from '../commands-utils/sha1'
import { customCommand } from './defineCommand'

export function evaluate(script, numberOfKeys, ...args) {
  // store sha1 and the script  itself for `evalsha` function
  const scriptSha = sha1(script)
  this.shaScripts[scriptSha] = script
  // evaluate
  return createCommand(
    customCommand(numberOfKeys, script).bind(this),
    '',
    this
  )(...args)
}

export async function evalBuffer(...args) {
  const val = await evaluate.apply(this, args)
  return convertStringToBuffer(val)
}
