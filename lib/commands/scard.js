'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.scard = scard;

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function scard(key) {
  var set = this.data.get(key);
  if (!set) {
    return 0;
  }
  if (!(set instanceof _es6Set2.default)) {
    throw new Error('Key ' + key + ' does not contain a set');
  }
  return this.data.get(key).size;
}
