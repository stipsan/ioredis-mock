import { chain } from 'lodash';
import * as commands from './commands';
import bufferMethods from './buffer-methods';
import { createCommand, createBufferCommand } from './command';
import createData from './data';
import createExpires from './expires';

class RedisMock {
  constructor({ data = {} } = { }) {
    this.channels = {};
    this.batch = [];

    this.expires = createExpires();

    this.data = createData(this.expires, data);

    // All commands
    Object.assign(this, chain(commands)
      .mapValues(command => command.bind(this))
      .mapValues(createCommand)
      .value()
    );

    // Buffer commands
    Object.assign(this, chain(commands)
      .pick(bufferMethods)
      .mapValues(command => command.bind(this))
      .mapValues(createBufferCommand)
      .mapKeys((_, name) => `${name}Buffer`)
      .value()
    );

    this.duplicate = () => this
  }
  multi(batch) {
    this.batch = batch.map(([command, ...options]) => this[command].bind(this, ...options));

    return this;
  }
  exec() {
    return Promise.all(this.batch.map(promise => promise()))
      .then(results => results.map(result => [null, result]));
  }
}

export default RedisMock;
