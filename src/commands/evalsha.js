import createCommand from '../command'
import { customCommand } from './defineCommand'

/**
 * EVALSHA redis command
 * https://redis.io/commands/evalsha
 *
 * Before using it, you need to:
 * 1) call your LUA script using EVAL first, to load it into memory
 * 2) calculate sha1 hash of your script, e.g. using the function in src/commands-utils/sha1.js
 *
 * The rest is exactly like calling EVAL
 *
 * @param sha1
 * @param numberOfKeys
 * @param args
 * @returns {*|Promise<unknown>}
 */
export function evalsha(sha1, numberOfKeys, ...args) {
  if (!(sha1 in this.shaScripts) || !this.shaScripts[sha1]) {
    throw new Error('NOSCRIPT No matching script. Please use EVAL.')
  }
  const script = this.shaScripts[sha1]
  return createCommand(
    customCommand(numberOfKeys, script).bind(this),
    '',
    this
  )(...args)
}

export async function evalshaBuffer(...args) {
  const val = await evalsha.apply(this, args)
  return !val || Number.isInteger(val) ? val : Buffer.from(val)
}
