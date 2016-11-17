import Promise from 'bluebird';
import { flowRight, spread } from 'lodash';
import {
  bufsToString,
  nonBufsToString,
  stringsToBuf,
} from './utils';

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
  const pipeline = flowRight([
    bufsToString,
    spread(emulate),
    nonBufsToString,
  ]);
  return commandImpl(pipeline);
}

export function createBufferCommand(emulate) {
  const pipeline = flowRight([
    stringsToBuf,
    spread(emulate),
    nonBufsToString,
  ]);
  return commandImpl(pipeline);
}
