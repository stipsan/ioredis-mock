import * as commands from './commands';
import bufferMethods from './buffer-methods';
import createCommand from './command';
import createData from './data';
import createExpires from './expires';

class RedisMock {
  constructor({ data = {} } = { }) {
    this.channels = {};
    this.batch = [];

    this.expires = createExpires();

    this.data = createData(this.expires, data);

    Object
      .keys(commands)
      .forEach((command) => {
        this[command] = createCommand(commands[command].bind(this));
        if (bufferMethods.includes(command)) {
          this[`${command}Buffer`] = createCommand(commands[command].bind(this), true);
        }
      });
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
