'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.sdiff = sdiff;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function sdiff(ours) {
  var _this = this;

  if (
    this.data.has(ours) &&
    !(this.data.get(ours) instanceof _es6Set2.default)
  ) {
    throw new Error('Key ' + ours + ' does not contain a set');
  }

  for (
    var _len = arguments.length,
      theirs = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    theirs[_key - 1] = arguments[_key];
  }

  theirs.forEach(function(key) {
    if (
      _this.data.has(key) &&
      !(_this.data.get(key) instanceof _es6Set2.default)
    ) {
      throw new Error('Key ' + key + ' does not contain a set');
    }
  });

  var ourSet = this.data.has(ours)
    ? this.data.get(ours)
    : new _es6Set2.default();
  var theirSets = theirs.map(function(key) {
    return _this.data.has(key) ? _this.data.get(key) : new _es6Set2.default();
  });
  var difference = new _es6Set2.default(
    (0, _arrayFrom2.default)(ourSet).filter(function(ourValue) {
      return theirSets.reduce(function(isUnique, set) {
        return set.has(ourValue) ? false : isUnique;
      }, /* isUnique */ true);
    })
  );

  return (0, _arrayFrom2.default)(difference);
}
