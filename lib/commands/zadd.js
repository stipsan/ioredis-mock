'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zadd = zadd;

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function zadd(key) {
  if (!this.data.has(key)) {
    this.data.set(key, new _es6Map2.default());
  }

  var added = 0;
  var map = this.data.get(key);
  for (
    var i = 0;
    i < (arguments.length <= 1 ? 0 : arguments.length - 1);
    i += 2
  ) {
    var score = arguments.length <= i + 1 ? undefined : arguments[i + 1];
    var value =
      arguments.length <= i + 1 + 1 ? undefined : arguments[i + 1 + 1];
    if (!map.has(value)) {
      added++;
    }
    map.set(value, { score: score, value: value });
  }

  this.data.set(key, map);
  return added;
}
