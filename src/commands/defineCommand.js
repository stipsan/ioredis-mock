import fengari from 'fengari';
import interop from 'fengari-interop';

import createCommand from '../command';
import { init, dispose } from '../lua';
import * as commands from '.';

const { lua, to_luastring: toLuaString } = fengari;

/**
 * exported to test
 *
 * @param {*} vm - object with the lua state (L) and some utils
 * ->
 * @param fn - a function returning 0 for non-error and != 0 for error
 */
export const defineRedisObject = vm => fn => {
  vm.defineGlobalFunction(fn, 'call');

  // define redis object with call method
  vm.luaExecString(`
    local redis = {}
    redis.call = function(...)
        return call(select('#', ...), ...)
    end
    return redis
  `);

  // loads the redis object from the stack into the global table under key 'redis'
  lua.lua_setglobal(vm.L, toLuaString('redis'));
};

const callToRedisCommand = vm =>
  function callToRedisCommand2() {
    const rawArgs = vm.extractArgs();

    const args = Number.isInteger(rawArgs[0]) ? rawArgs.slice(1) : rawArgs;
    const name = args[0].toLowerCase();
    const redisCmd = commands[name].bind(this);
    const result = redisCmd(...args.slice(1));

    if (result) {
      interop.push(vm.L, result);
      return 1;
    }
    return 0;
  };

// exported to test
export function defineKeys(vm, numberOfKeys, commandArgs) {
  const keys = commandArgs.slice(0, numberOfKeys);
  vm.defineGlobalArray(keys, 'KEYS');
}

// exported to test
export function defineArgv(vm, numberOfKeys, commandArgs) {
  const args = commandArgs.slice(numberOfKeys);
  vm.defineGlobalArray(args, 'ARGV');
}

// exported to test
export const customCommand = (numberOfKeys, luaCode) =>
  function customCommand2(...luaScriptArgs) {
    const vm = init();
    defineRedisObject(vm)(callToRedisCommand(vm).bind(this));

    defineKeys.bind(this)(vm, numberOfKeys, luaScriptArgs);
    defineArgv.bind(this)(vm, numberOfKeys, luaScriptArgs);

    const topBeforeExecute = lua.lua_gettop(vm.L);
    vm.luaExecString(luaCode);
    const retVal = vm.popReturnValue(topBeforeExecute);
    dispose(vm);
    return retVal;
  };

export function defineCommand(command, { numberOfKeys, lua: luaCode }) {
  this[command] = createCommand(
    customCommand(numberOfKeys, luaCode).bind(this),
    command,
    this
  );
}
