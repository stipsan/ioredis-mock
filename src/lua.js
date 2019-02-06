import fengari from 'fengari';
import interop from 'fengari-interop';

const {
  lua,
  lualib,
  lauxlib,
  to_luastring: toLuaString,
  to_jsstring: toJsString,
} = fengari;

const handleError = L => {
  const errorMsg = lua.lua_tojsstring(L, -1);
  const message = `Error trying to load lua in VM: ${errorMsg}`;
  const e = new Error(message);
  // console.log('STACK:', e.stack)
  throw e;
};

const luaExecString = L => str => {
  const retCode = lauxlib.luaL_dostring(L, toLuaString(str));
  if (retCode !== 0) handleError(L);
};

// DEBUGGING PRINT TOOL
// const printStack = L => msg => {
//   const output = []
//   output.push(`===== PRINTING STACK: ${msg} =====`)
//   const newTop = lua.lua_gettop(L);
//   output.push(`| newTop ${newTop} |`)
//   let i = newTop * -1;
//   output.push(`STACK ${i}`)
//   while (i < 0) {
//     output.push('-----')
//     output.push(interop.tojs(L, i))
//     output.push('-----')
//     i++;
//   }
//   console.log(output.join('\n'))
// };

const getTopLength = L => {
  // get length of array in top of the stack
  lua.lua_len(L, -1);
  const length = lua.lua_tointeger(L, -1);
  lua.lua_pop(L, 1);
  return length;
  // ~get length of array in top of the stack
};

const typeOf = L => pos =>
  toJsString(lua.lua_typename(L, lua.lua_type(L, pos)));

const getTopKeys = L => {
  if (lua.lua_isnil(L, -1)) throw new Error('cannot get keys on nil');
  if (!lua.lua_istable(L, -1))
    throw new Error(`non-tables don't have keys! type is "${typeOf(L)(-1)}"`);
  lua.lua_pushnil(L);
  const keys = [];
  while (lua.lua_next(L, -2) !== 0) {
    keys.push(interop.tojs(L, -2));
    lua.lua_pop(L, 1);
  }
  return keys;
};

const isTopArray = L => () => {
  try {
    const keys = getTopKeys(L);
    // TODO: fix this, its assuming that the traversing is always backwards while its not guaranteed.
    return keys.reverse().every((v, i) => v === i + 1);
  } catch (e) {
    return false;
  }
};

const makeReturnValue = L => {
  const isArray = isTopArray(L)();
  if (!isArray) {
    return interop.tojs(L, -1);
  }

  const arrayLength = getTopLength(L);

  const table = interop.tojs(L, -1);
  const retVal = [];

  if (arrayLength === 0) {
    lua.lua_pop(L, 1);
    return retVal;
  }

  for (let i = 1; i <= arrayLength; i++) {
    interop.push(L, table.get(i));
    retVal.push(makeReturnValue(L));
  }

  lua.lua_pop(L, 1);
  return retVal;
};

const popReturnValue = L => topBeforeCall => {
  const numReturn = lua.lua_gettop(L) - topBeforeCall + 1;
  let ret;
  if (numReturn > 0) {
    ret = makeReturnValue(L);
  }
  lua.lua_settop(L, topBeforeCall);
  return ret;
};

const pushTable = L => obj => {
  lua.lua_newtable(L);
  const index = lua.lua_gettop(L);

  Object.keys(obj).forEach(fieldName => {
    interop.push(L, fieldName);
    // eslint-disable-next-line no-use-before-define
    push(L)(obj[fieldName]);
    lua.lua_settable(L, index);
  });
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

const push = L => value => {
  if (Array.isArray(value)) {
    pushArray(L)(value);
  } else if (value && typeof value === 'object' && !Array.isArray(value)) {
    pushTable(L)(value);
  } else {
    interop.push(L, value);
  }
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

const extractArgs = L => () => {
  const top = lua.lua_gettop(L);
  const args = [];
  let a = -top;
  while (a < 0) {
    args.push(a);
    a += 1;
  }
  return args.map(i => interop.tojs(L, i));
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
    utils: {
      isTopArray: isTopArray(L),
      push: push(L),
    },
  };
};

export const dispose = vm => {
  const L = vm.L || vm;
  lua.lua_close(L);
};
