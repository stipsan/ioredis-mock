'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.sadd = sadd;

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function sadd(key) {
  if (!this.data.has(key)) {
    this.data.set(key, new _es6Set2.default());
  }
  var added = 0;
  var set = this.data.get(key);

  for (
    var _len = arguments.length,
      vals = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    vals[_key - 1] = arguments[_key];
  }

  vals.forEach(function(value) {
    if (!set.has(value)) {
      added++;
    }
    set.add(value);
  });
  this.data.set(key, set);
  return added;
}
