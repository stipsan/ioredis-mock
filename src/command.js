import Promise from 'bluebird';

export default function command(emulate) {
  return (...args) => {
    let length = args.length;
    const lastArgIndex = length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      length = lastArgIndex;
    }
    const newArgs = new Array(length);
    for (let i = 0; i < length; ++i) {
      newArgs[i] = args[i];
    }

    return new Promise(resolve => resolve(emulate(...newArgs))).asCallback(callback);
  };
}
