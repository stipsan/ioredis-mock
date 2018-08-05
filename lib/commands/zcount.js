'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zcount = zcount;

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _lodash = require('lodash');

var _zrangeCommand = require('./zrange-command.common');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function zcount(key, inputMin, inputMax) {
  var map = this.data.get(key);
  if (!map) {
    return 0;
  }

  if (this.data.has(key) && !(this.data.get(key) instanceof _es6Map2.default)) {
    return 0;
  }

  var min = (0, _zrangeCommand.parseLimit)(inputMin);
  var max = (0, _zrangeCommand.parseLimit)(inputMax);
  var filteredArray = (0, _lodash.filter)(
    (0, _arrayFrom2.default)(map.values()),
    (0, _zrangeCommand.filterPredicate)(min, max)
  );

  return filteredArray.length;
}
