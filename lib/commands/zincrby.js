'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.zincrby = zincrby;

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function zincrby(key, increment, value) {
  if (!this.data.has(key)) {
    this.data.set(key, new _es6Map2.default());
  }

  var map = this.data.get(key);
  var score = 0;
  if (map.has(value)) {
    var _map$get = map.get(value);

    score = _map$get.score;
  }

  score += parseFloat(increment);
  map.set(value, { value: value, score: score });

  this.data.set(key, map);
  return score.toString();
}
