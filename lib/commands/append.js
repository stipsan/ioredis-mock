'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.append = append;
function append(key, value) {
  if (!this.data.has(key)) {
    this.data.set(key, '');
  }
  this.data.set(key, this.data.get(key) + value);
  return this.data.get(key).length;
}
