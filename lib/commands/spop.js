'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.spop = spop;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var safeCount = function safeCount(count) {
  var result = count !== undefined ? parseInt(count, 10) : 1;
  if (Number.isNaN(result) || result < 0) {
    throw new Error('ERR value is not an integer or out of range');
  }
  return result;
};

function spop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof _es6Set2.default)) {
    throw new Error('Key ' + key + ' does not contain a set');
  }
  var want = safeCount(count);
  var set = this.data.get(key) || new _es6Set2.default();
  var total = set.size;

  if (want === 0) return undefined;
  if (total === 0) return null;
  var values = _lodash2.default.chain(set).toArray();
  var result = void 0;
  if (want === 1) {
    result = values.sample().value();
    set.delete(result);
  } else if (total <= want) {
    result = values.value();
    set.clear();
  } else {
    values.shuffle(); // Randomize take
    result = values.take(want).value();
    result.map(function(item) {
      return set.delete(item);
    });
  }

  this.data.set(key, set);
  return result;
}
