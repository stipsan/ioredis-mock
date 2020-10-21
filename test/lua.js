import expect from 'expect';
import fengari from 'fengari';
import interop from 'fengari-interop';

import { init, dispose } from '../src/lua';
import {
  defineRedisObject,
  defineKeys,
  defineArgv,
} from '../src/commands/defineCommand';

const { lua } = fengari;

describe('lua', () => {
  let vm;

  beforeEach(() => {
    vm = init();
  });

  afterEach(() => {
    dispose(vm);
  });

  describe('lua utils', () => {
    describe('isTopArray', () => {
      it('should be an array', () => {
        vm.luaExecString('return {1, 2}');
        expect(vm.utils.isTopArray(vm.L)).toEqual(true);
      });
      it('should NOT be an array when it is a string', () => {
        interop.push(vm.L, 'hi');
        expect(vm.utils.isTopArray(vm.L)).toEqual(false);
      });
      it('should NOT be an array when it is a number', () => {
        interop.push(vm.L, 1000);
        expect(vm.utils.isTopArray(vm.L)).toEqual(false);
      });
      it('should NOT be an array when it is a userdata', () => {
        interop.push(vm.L, { hi: 'hello', bye: 'goodbye' });
        expect(vm.utils.isTopArray(vm.L)).toEqual(false);
      });
      it('should NOT be an array when it is a table', () => {
        vm.utils.push({ hi: 'hello', bye: 'goodbye' });
        expect(vm.utils.isTopArray(vm.L)).toEqual(false);
      });
    });
    describe('luaExecString', () => {
      it('should execute returning some value', () => {
        const topBeforeCall = lua.lua_gettop(vm.L);
        vm.luaExecString('return 1 + 1');
        expect(vm.popReturnValue(topBeforeCall)).toBe(2);
      });

      it('should report an error in the lua code', () => {
        try {
          vm.luaExecString('error("kaboom!")');
          expect(true).toBe(false);
        } catch (e) {
          expect(e).toMatch(/kaboom!/);
        }
      });
    });
  });

  describe('setting up the LUA server context', () => {
    describe('the redis global object', () => {
      it('should execute a lua script that calls the call fn of the global redis object', () => {
        // a flag to expect on
        let wasCalledWith = false;

        // the call function
        const call = () => {
          const top = lua.lua_gettop(vm.L);
          const args = [];
          let a = -top;
          while (a < 0) {
            args.push(a);
            a += 1;
          }
          const argu = args.map((i) => interop.tojs(vm.L, i));

          wasCalledWith = argu;

          interop.push(vm.L, 15);

          return 1;
        };

        defineRedisObject(vm)(call);

        // execute fn
        vm.luaExecString(`
          local rcall = redis.call
          local exists = rcall("EXISTS", "PEPE", "THIRD")
          if (exists == nil) then
            error("todo mal")
          end

          local testingReturningAnyNumber = 15200
          return testingReturningAnyNumber
        `);

        // expect it was called and we can get the right arguments
        expect(wasCalledWith).toEqual([false, 'EXISTS', 'PEPE', 'THIRD']);
      });
    });

    describe('the KEYS and ARGV global tables', () => {
      it('should be able to get key and arguments', () => {
        const args = [
          'key1',
          'key2',
          'keyTul',
          'arg1',
          'arg2',
          'argof***yourself',
        ];

        defineKeys(vm, 3, args);
        defineArgv(vm, 3, args);

        vm.luaExecString(`
          local check = function(tname, t, i, v)
              if (v == nil) then
                error("while comparing " .. tname .. " at " .. i .. " the value provided to compare was nil")
              end
              if (t[i] == nil) then
                error(tname .. " at " .. i .. " was nil")
              end
              if (t[i] ~= v) then
                  local msg = "Error at " .. tname .. " index " .. i .. " was not equal to " .. v .. " but was " .. t[i]
                  error(msg)
              end
          end
          local keyCheck = function(i, v)
            return check("KEYS", KEYS, i, v)
          end
          local argCheck = function(i, v)
            return check("ARGV", ARGV, i, v)
          end

          keyCheck(1, "${args[0]}")
          keyCheck(2, "${args[1]}")
          keyCheck(3, "${args[2]}")

          argCheck(1, "${args[3]}")
          argCheck(2, "${args[4]}")
          argCheck(3, "${args[5]}")
        `);
      });
    });
  });
});
