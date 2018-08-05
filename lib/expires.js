'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = createExpires;
function createExpires() {
  var expires = {};

  return {
    get: function get(key) {
      return expires[key];
    },
    set: function set(key, timestamp) {
      expires[key] = +timestamp;
    },
    has: function has(key) {
      return {}.hasOwnProperty.call(expires, key);
    },
    isExpired: function isExpired(key) {
      return expires[key] <= Date.now();
    },
    delete: function _delete(key) {
      delete expires[key];
    },
  };
}
