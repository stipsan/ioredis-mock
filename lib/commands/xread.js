'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})();

exports.xread = xread;

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

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

function xread(option) {
  var _this = this;

  for (
    var _len = arguments.length,
      args = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  var _ref =
      option === 'STREAMS'
        ? { op: 'COUNT', opVal: Infinity, rest: args }
        : {
            op: option,
            opVal: parseInt(args[0], 10),
            rest: args.slice(2),
          },
    op = _ref.op,
    opVal = _ref.opVal,
    rest = _ref.rest;

  if (['COUNT', 'BLOCK'].indexOf(op) < 0) {
    throw new Error('ERR syntax error');
  }

  if (rest.length % 2 !== 0) {
    throw new Error(
      "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified."
    );
  }

  // Turn ["stream1", "stream2", "id1", "id2"] into tuples of
  //      [["stream1", "id1"], ["stream2", "id2"]]
  var toPoll = rest.reduce(function(memo, arg, i) {
    var chunk = Math.floor(i / 2);
    var tuple = memo[chunk] || [];
    // eslint-disable-next-line no-param-reassign
    memo[chunk] = tuple.concat(arg);
    return memo;
  }, []);

  var pollStream = function pollStream(stream, id) {
    var count =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var data = _this.data.get(stream);
    if (!data) return [];
    return data.reduce(function(memo, _ref2) {
      var _ref3 = _toArray(_ref2),
        eventId = _ref3[0],
        row = _ref3.slice(1);

      var _data$get = _this.data.get('stream:' + stream + ':' + eventId),
        polled = _data$get.polled;

      if (!polled && (id === '$' || eventId >= id) && memo.length < count) {
        _this.data.set('stream:' + stream + ':' + eventId, { polled: true });
        return memo.concat([[eventId].concat(_toConsumableArray(row))]);
      }
      return memo;
    }, []);
  };

  var pollEvents = function pollEvents(streams, countVal) {
    return streams.reduce(function(memo, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        stream = _ref5[0],
        id = _ref5[1];

      return [[stream, pollStream(stream, id, countVal)]].concat(memo);
    }, []);
  };

  return op === 'BLOCK'
    ? new Promise(function(resolve) {
        var timeElapsed = 0;
        var f = function f() {
          return setTimeout(function() {
            if (opVal > 0 && timeElapsed < opVal) return resolve(null);
            var events = pollEvents(toPoll, 1);
            if (events.length > 0) return resolve(events);
            timeElapsed += 100;
            return f();
          }, 100);
        };
        f();
      })
    : new Promise(function(resolve) {
        var events = pollEvents(toPoll, opVal);
        if (events.length === 0) return resolve(null);
        return resolve(events.slice().reverse());
      });
}
