import Promise from 'bluebird';

export default function command(emulate) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      args.length = lastArgIndex; // eslint-disable-line no-param-reassign
    }

    // transform non-buffer arguments to strings to simulate real ioredis behavior
    const stringArgs = args.map(arg => arg instanceof Buffer ? arg : arg.toString());

    return new Promise(resolve => resolve(emulate(...stringArgs))).asCallback(callback);
  };
}
