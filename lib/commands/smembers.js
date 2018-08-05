'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.smembers = smembers;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function smembers(key) {
  if (!this.data.has(key)) {
    return [];
  }

  return (0, _arrayFrom2.default)(this.data.get(key));
}
