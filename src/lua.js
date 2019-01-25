import fengari from 'fengari';
import interop from 'fengari-interop';

const { lua, lualib, lauxlib, to_luastring: toLuaString } = fengari;

const handleError = L => {
  const errorMsg = lua.lua_tojsstring(L, -1);
  const message = `Error trying to load lua in VM: ${errorMsg}`;
  const e = new Error(message);
  // console.log('STACK:', e.stack)
  throw e;
};

const popReturnValue = L => topBeforeCall => {
  const numReturn = lua.lua_gettop(L) - topBeforeCall + 1;
  let ret;
  if (numReturn > 0) {
    ret = interop.tojs(L, -1);
  }
  lua.lua_settop(L, topBeforeCall);
  return ret;
};

const pushArray = L => array => {
  lua.lua_newtable(L);
  const subTableIndex = lua.lua_gettop(L);

  array.forEach((e, i) => {
    interop.push(L, i + 1);
    interop.push(L, e);
    lua.lua_settable(L, subTableIndex);
  });
};

const defineGlobalArray = L => (array, name) => {
  pushArray(L)(array);
  lua.lua_setglobal(L, toLuaString(name));
};

const defineGlobalFunction = L => (fn, name) => {
  // define global fn call
  lua.lua_pushjsfunction(L, fn);
  lua.lua_setglobal(L, toLuaString(name));
};

const luaExecString = L => str => {
  const retCode = lauxlib.luaL_dostring(L, toLuaString(str));
  if (retCode !== 0) handleError(L);
};

const extractArgs = L => () => {
  // console.log('>> extractArgs')
  const top = lua.lua_gettop(L);
  // console.log('>> extractArgs', top)
  const args = [];
  let a = -top;
  while (a < 0) {
    args.push(a);
    a += 1;
  }
  // console.log('>> extractArgs', args)
  return args.map(i => interop.tojs(L, i));
};

const printStack = L => () => {
  // console.log('===== PRINTING STACK:', msg, '=====')
  const newTop = lua.lua_gettop(L);
  // console.log('newTop', newTop)
  let i = newTop * -1;
  // console.log('STACK', i)
  while (i < 0) {
    // console.log(interop.tojs(L, i))
    i++;
  }
  // console.log('===== FINISHED STACK:', msg, '=====')
};

export const init = () => {
  // init fengari
  const L = lauxlib.luaL_newstate();
  lualib.luaL_openlibs(L);
  interop.luaopen_js(L);
  return {
    L,
    defineGlobalFunction: defineGlobalFunction(L),
    defineGlobalArray: defineGlobalArray(L),
    luaExecString: luaExecString(L),
    extractArgs: extractArgs(L),
    popReturnValue: popReturnValue(L),
    printStack: printStack(L),
  };
};

export const dispose = vm => {
  const L = vm.L || vm;
  lua.lua_close(L);
};
