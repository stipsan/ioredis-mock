'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.keys = keys;

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function keys(globString) {
  return this.data.keys().filter(function(key) {
    return (0, _minimatch2.default)(key, globString);
  });
}
