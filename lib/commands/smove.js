'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.smove = smove;

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function smove(source, destination, member) {
  if (
    this.data.has(source) &&
    !(this.data.get(source) instanceof _es6Set2.default)
  ) {
    throw new Error('Key ' + source + ' does not contain a set');
  }
  if (
    this.data.has(destination) &&
    !(this.data.get(destination) instanceof _es6Set2.default)
  ) {
    throw new Error('Key ' + destination + ' does not contain a set');
  }

  if (!this.data.has(source)) {
    return 0;
  }

  var sourceSet = this.data.get(source);
  if (!sourceSet.has(member)) {
    return 0;
  }

  sourceSet.delete(member);
  this.data.set(source, sourceSet);

  if (!this.data.has(destination)) {
    this.data.set(destination, new _es6Set2.default());
  }

  var destSet = this.data.get(destination);
  destSet.add(member);
  this.data.set(destination, destSet);

  return 1;
}
