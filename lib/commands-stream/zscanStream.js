'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zscanStream = zscanStream;

var _readableScan = require('../commands-utils/readable-scan');

var _readableScan2 = _interopRequireDefault(_readableScan);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function zscanStream(key) {
  var opt =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var options = opt instanceof Object ? opt : {};
  options.key = key;
  return new _readableScan2.default(this.zscan, options);
}
