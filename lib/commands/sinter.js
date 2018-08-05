'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.sinter = sinter;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

var _index = require('./index');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function sinter() {
  var _this = this;

  for (
    var _len = arguments.length, keys = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    keys[_key] = arguments[_key];
  }

  var values = _index.sunion.apply(this, keys);
  var sets = keys.map(function(key) {
    return _this.data.has(key) ? _this.data.get(key) : new _es6Set2.default();
  });

  var intersection = new _es6Set2.default(
    values.filter(function(value) {
      return sets.reduce(function(isShared, set) {
        return set.has(value) ? isShared : false;
      }, /* isShared */ true);
    })
  );

  return (0, _arrayFrom2.default)(intersection);
}
