'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.ping = ping;
function ping() {
  var message =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'PONG';

  return message;
}
