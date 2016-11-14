import Promise from 'bluebird';
import _ from 'lodash';

// transform non-buffer arguments to strings to simulate real ioredis behavior
function nonBufToString(args) {
  return args.map(arg => (arg instanceof Buffer) ? arg : arg.toString());
}

// if bufMode, convert strings and string values of arrays to buffers
function toBufIf(bufMode) {
  if (!bufMode) {
    return _.identity;
  }

  return (value) => {
    if (value instanceof String) {
      return Buffer.from(value);
    }
    if (value instanceof Array) {
      return value.map(v => (v instanceof String) ? Buffer.from(v) : v);
    }
    return value;
  }
}

export default function command(emulate, bufMode=false) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      args.length = lastArgIndex; // eslint-disable-line no-param-reassign
    }

    const resolveFun = resolve => _.flowRight([
      resolve,
      toBufIf(bufMode),
      _.spread(emulate),
      nonBufToString
    ])(args);

    return new Promise(resolveFun).asCallback(callback);
  };
}
