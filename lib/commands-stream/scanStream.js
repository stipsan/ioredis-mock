'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.scanStream = scanStream;

var _readableScan = require('../commands-utils/readable-scan');

var _readableScan2 = _interopRequireDefault(_readableScan);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function scanStream(opt) {
  return new _readableScan2.default(this.scan, opt);
}
