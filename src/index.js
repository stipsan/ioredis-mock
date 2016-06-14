import * as commands from './commands';

class RedisMock {
  constructor({ data } = { data: {} }) {
    this.data = data;

    Object.keys(commands).forEach(command => { this[command] = commands[command]; });
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
