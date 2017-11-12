import Promise from 'bluebird';

export default function command(emulate) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex;
    }

    // transform non-buffer arguments to strings to simulate real ioredis behavior
    const stringArgs = args.map(
      arg => (arg instanceof Buffer ? arg : arg.toString())
    );

    return new Promise(resolve => resolve(emulate(...stringArgs))).asCallback(
      callback
    );
  };
}
