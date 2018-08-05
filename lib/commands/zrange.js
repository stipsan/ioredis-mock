'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zrange = zrange;

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _lodash = require('lodash');

var _zrangeCommand = require('./zrange-command.common');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function zrange(key, s, e) {
  var map = this.data.get(key);
  if (!map) {
    return [];
  }

  // @TODO investigate a more stable way to detect sorted lists
  if (this.data.has(key) && !(this.data.get(key) instanceof _es6Map2.default)) {
    return [];
  }

  var start = parseInt(s, 10);
  var end = parseInt(e, 10);

  var val = (0, _lodash.orderBy)((0, _arrayFrom2.default)(map.values()), [
    'score',
    'value',
  ]).map(function(it) {
    return it.value;
  });

  return (0, _zrangeCommand.slice)(val, start, end);
}
