import _ from 'lodash';

class RedisMock {
  // @FIXME if no data is supplied it should default to an empty {}
  constructor({ data }) {
    this.data = data;
  }
  incr(key) {
    return new Promise(resolve => {
      const curVal = Number(this.data[key]);
      const incVal = curVal + 1;
      resolve(incVal.toString());
    });
  }
  hsetnx(key, hashKey, hashVal) {
    return new Promise(resolve => {
      if (!this.data.hasOwnProperty(key)) {
        this.data[key] = {};
      }
      const exists = this.data[key].hasOwnProperty(hashKey);
      this.data[key][hashKey] = hashVal;

      resolve(!exists);
    });
  }
  hmset(key, ...hmsetData) {
    return new Promise(resolve => {
      if (!this.data.hasOwnProperty(key)) {
        this.data[key] = {};
      }
      for (let i = 0; i < hmsetData.length; i += 2) {
        this.data[key][hmsetData[i]] = hmsetData[i + 1];
      }

      resolve('OK');
    });
  }
  sadd(key, val) {
    return new Promise(resolve => {
      this.data[key].push(val);
      resolve(1);
    });
  }
  srem(key, val) {
    return new Promise(resolve => {
      const index = this.data[key].indexOf(val);
      this.data[key].splice(index, 1);
      resolve(1);
    });
  }
  hget(key, hashKey) {
    return new Promise(resolve => resolve(this.data[key][hashKey]));
  }
  hvals(key) {
    return new Promise(resolve => {
      resolve(_.values(this.data[key]));
    });
  }
  hgetall(key) {
    return new Promise(resolve => {
      resolve(this.data[key]);
    });
  }
  smembers(key) {
    return new Promise(resolve => {
      resolve(this.data[key]);
    });
  }
  sismember(key, val) {
    return new Promise(resolve => {
      resolve(this.data[key].indexOf(val) !== -1);
    });
  }
  hset(key, hashKey, hashVal) {
    return new Promise(resolve => {
      this.data[key][hashKey] = hashVal;
      resolve('OK');
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
