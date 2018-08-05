'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.hincrbyfloat = hincrbyfloat;

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

function hincrbyfloat(key, field, increment) {
  if (!this.data.has(key)) {
    this.data.set(key, _defineProperty({}, field, '0'));
  }
  var hash = this.data.get(key);
  if (!{}.hasOwnProperty.call(hash, field)) {
    hash[field] = '0';
  }
  var curVal = parseFloat(hash[field]);
  hash[field] = (curVal + parseFloat(increment)).toString();
  this.data.set(key, hash);
  return hash[field];
}
