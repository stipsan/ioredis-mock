import Promise from 'bluebird';
import _ from 'lodash';

// transform non-buffer arguments to strings to simulate real ioredis behavior
function nonBufToString(args) {
  return args.map(arg => _.isBuffer(arg) ? arg : arg && arg.toString());
}

// Convert strings and string values of arrays to buffers
function toBuf(value) {
  if (_.isString(value)) {
    return Buffer.from(value);
  }
  if (_.isArray(value)) {
    return value.map(v => _.isString(v) ? Buffer.from(v) : v);
  }
  return value;
}

// Convert buffers and buffer values of arrays to strings
function toString(value) {
  if (_.isBuffer(value)) {
    return value.toString();
  }
  if (_.isArray(value)) {
    return value.map(v => _.isBuffer(v) ? v.toString() : v);
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
    toString,
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
