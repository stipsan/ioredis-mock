'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hincrby = hincrby;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function hincrby(key, field) {
  var increment =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!this.data.has(key)) {
    this.data.set(key, _defineProperty({}, field, '0'));
  }
  var hash = this.data.get(key);
  if (!{}.hasOwnProperty.call(hash, field)) {
    hash[field] = '0';
  }
  var curVal = Number(hash[field]);
  var nextVal = curVal + parseInt(increment, 10);
  hash[field] = nextVal.toString();
  this.data.set(key, hash);

  return nextVal;
}
