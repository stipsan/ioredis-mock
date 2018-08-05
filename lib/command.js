'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.processArguments = processArguments;
exports.processReply = processReply;
exports.default = command;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

function processArguments(args, commandName, RedisMock) {
  var commandArgs = args ? _lodash2.default.flatten(args) : [];
  if (RedisMock.Command.transformers.argument[commandName]) {
    commandArgs = RedisMock.Command.transformers.argument[commandName](args);
  }
  commandArgs = commandArgs.map(
    // transform non-buffer arguments to strings to simulate real ioredis behavior
    function(arg) {
      return arg instanceof Buffer || arg === null ? arg : arg.toString();
    }
  );
  return commandArgs;
}

function processReply(result, commandName, RedisMock) {
  if (RedisMock.Command.transformers.reply[commandName]) {
    return RedisMock.Command.transformers.reply[commandName](result);
  }
  return result;
}
function command(commandEmulator, commandName, RedisMock) {
  return function() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    var lastArgIndex = args.length - 1;
    var callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex;
    }

    var commandArgs = processArguments(args, commandName, RedisMock);

    return new _bluebird2.default(function(resolve) {
      return resolve(
        processReply(
          commandEmulator.apply(undefined, _toConsumableArray(commandArgs)),
          commandName,
          RedisMock
        )
      );
    }).asCallback(callback);
  };
}
