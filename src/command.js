import Promise from 'bluebird';
import _ from 'lodash';

// transform non-buffer arguments to strings to simulate real ioredis behavior
function nonBufToString(args) {
  return args.map(arg => (arg instanceof Buffer) ? arg : arg.toString());
}

// Convert strings and string values of arrays to buffers
function toBuf(value) {
  if (value instanceof String) {
    return Buffer.from(value);
  }
  if (value instanceof Array) {
    return value.map(v => (v instanceof String) ? Buffer.from(v) : v);
  }
  return value;
}

function commandImpl(pipeline) {

  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      args.length = lastArgIndex; // eslint-disable-line no-param-reassign
    }

    return new Promise(resolve => resolve(pipeline(args))).asCallback(callback);
  };
}

export function createCommand(emulate) {
  const pipeline = _.flowRight([
    _.spread(emulate),
    nonBufToString
  ]);
  return commandImpl(pipeline);
}

export function createBufferCommand(emulate) {
  const pipeline = _.flowRight([
    toBuf,
    _.spread(emulate),
    nonBufToString
  ]);
  return commandImpl(pipeline);
}
