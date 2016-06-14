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

    return new Promise(resolve => resolve(emulate(...args))).asCallback(callback);
  };
}
