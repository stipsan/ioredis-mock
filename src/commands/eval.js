import createCommand from '../command';
import { customCommand } from './defineCommand';

export function evaluate(script, numberOfKeys, ...args) {
  return createCommand(
    customCommand(numberOfKeys, script).bind(this),
    '',
    this
  )(...args);
}
