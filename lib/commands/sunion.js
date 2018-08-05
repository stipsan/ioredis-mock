'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.sunion = sunion;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function sunion() {
  var _this = this;

  for (
    var _len = arguments.length, keys = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    keys[_key] = arguments[_key];
  }

  keys.forEach(function(key) {
    if (
      _this.data.has(key) &&
      !(_this.data.get(key) instanceof _es6Set2.default)
    ) {
      throw new Error('Key ' + key + ' does not contain a set');
    }
  });

  var sets = keys.map(function(key) {
    return _this.data.has(key) ? _this.data.get(key) : new _es6Set2.default();
  });
  var union = new _es6Set2.default(
    sets.reduce(function(combined, set) {
      return [].concat(
        _toConsumableArray(combined),
        _toConsumableArray((0, _arrayFrom2.default)(set))
      );
    }, [])
  );

  return (0, _arrayFrom2.default)(union);
}
