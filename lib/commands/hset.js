'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hset = hset;
function hset(key, hashKey, hashVal) {
  if (!this.data.has(key)) {
    this.data.set(key, {});
  }

  var reply = 1;
  var hash = this.data.get(key);

  if ({}.hasOwnProperty.call(hash, hashKey)) {
    reply = 0;
  }

  hash[hashKey] = hashVal;

  this.data.set(key, hash);

  return reply;
}
