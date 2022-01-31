import fengari from 'fengari'
import interop from 'fengari-interop'

import createCommand from '../command'
import { dispose, init } from '../lua'
import * as commands from '.'

const { lua, to_luastring: toLuaString } = fengari

/**
 * exported to test
 *
 * @param {*} vm - object with the lua state (L) and some utils
 * ->
 * @param fn - a function returning 0 for non-error and != 0 for error
 */
export const defineRedisObject = vm => fn => {
  vm.defineGlobalFunction(fn, 'call')

  // define redis object with call method
  // convert nil to false base on https://redis.io/commands/eval#conversion-between-lua-and-redis-data-types
  vm.luaExecString(`
    local redis = {}
    function repair(val)
      if val == nil then
        return false
      end
      return val
    end
    redis.call = function(...)
        return repair(call(false, ...))
    end
    redis.pcall = function(...)
        return repair(call(true, ...))
    end
    return redis
  `)

  // loads the redis object from the stack into the global table under key 'redis'
  lua.lua_setglobal(vm.L, toLuaString('redis'))
}

const callToRedisCommand = vm =>
  function callToRedisCommand2() {
    const rawArgs = vm.extractArgs()
    const returnError = rawArgs[0]
    let result
    try {
      const args = rawArgs.slice(1)
      const name = args[0].toLowerCase()
      const redisCmd = commands[name].bind(this)
      result = redisCmd(...args.slice(1))
    } catch (err) {
      if (!returnError) {
        throw err
      }
      interop.push(vm.L, ['error', err.toString()])
      return 1
    }
    if (!!result || result === 0) {
      if (Array.isArray(result)) {
        // fix for one-based indices
        result.unshift(null)
        // https://github.com/fengari-lua/fengari-interop/blob/1626687fb15452cdd82ee522955dd1f144ea7a68/src/js.js#L845
        result[Symbol.for('__len')] = function () {
          const arr = this
          return arr.length - 1
        }
      }
      interop.push(vm.L, result)
      return 1
    }
    return 0
  }

  const defineStructObject = vm => {
    vm.luaExecString(`
      local struct = {}
      struct.pack = function(...)
          return string.pack(...)
      end
      struct.unpack = function(...)
          return string.unpack(...)
      end
      struct.size = function(...)
          return string.packsize(...)
      end
      return struct
    `)
  
    // loads the redis object from the stack into the global table under key 'redis'
    lua.lua_setglobal(vm.L, toLuaString('struct'))
  }

  const defineCjsonObject = vm => {
    vm.defineGlobalFunction(() => {
      const json = vm.extractArgs()
      
      
      interop.push(vm.L, JSON.stringify(interop.tojs(vm.L, json)))
      return 1
    }, 'cjsonEncode')
    vm.defineGlobalFunction(() => {
      const [json] = vm.extractArgs()

      interop.push(vm.L, JSON.parse(json))
      return 1
    }, 'cjsonDecode')
   
  
    vm.luaExecString(`
      local cjson = {}
      cjson.encode = function(val)
          return js.global.JSON.stringify(val)
      end
      cjson.decode = function(val)
          return cjsonDecode(val)
      end
      
      return cjson
    `)
  
    // loads the redis object from the stack into the global table under key 'redis'
    lua.lua_setglobal(vm.L, toLuaString('cjson'))
  }

// exported to test
export function defineKeys(vm, numberOfKeys, commandArgs) {
  const keys = commandArgs.slice(0, numberOfKeys)
  vm.defineGlobalArray(keys, 'KEYS')
}

// exported to test
export function defineArgv(vm, numberOfKeys, commandArgs) {
  const args = commandArgs.slice(numberOfKeys)
  vm.defineGlobalArray(args, 'ARGV')
}

// exported to test
export const customCommand = (numberOfKeys, luaCode) =>
  function customCommand2(...luaScriptArgs) {
    const vm = init()
    defineRedisObject(vm)(callToRedisCommand(vm).bind(this))
    defineStructObject(vm)
    defineCjsonObject(vm)

    defineKeys.bind(this)(vm, numberOfKeys, luaScriptArgs)
    defineArgv.bind(this)(vm, numberOfKeys, luaScriptArgs)

    const topBeforeExecute = lua.lua_gettop(vm.L)
    vm.luaExecString(luaCode)
    const retVal = vm.popReturnValue(topBeforeExecute)
    dispose(vm)
    return retVal
  }

export function defineCommand(command, { numberOfKeys, lua: luaCode }) {
  const cmd = createCommand(
    customCommand(numberOfKeys, luaCode).bind(this),
    command,
    this
  )
  this[command] = cmd
  // for multi/pipeline
  this.customCommands[command] = cmd
}
