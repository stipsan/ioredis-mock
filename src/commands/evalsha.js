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
    throw new Error(`NOSCRIPT for sha1 ${sha1}`)
  }
  const script = this.shaScripts[sha1]
  return createCommand(
    customCommand(numberOfKeys, script).bind(this),
    '',
    this
  )(...args)
}
