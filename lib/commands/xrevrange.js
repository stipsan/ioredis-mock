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

exports.xrevrange = xrevrange;
function xrevrange(stream, end, start) {
  if (!stream || !start || !end) {
    throw new Error("ERR wrong number of arguments for 'xrevrange' command");
  }

  for (
    var _len = arguments.length,
      args = Array(_len > 3 ? _len - 3 : 0),
      _key = 3;
    _key < _len;
    _key++
  ) {
    args[_key - 3] = arguments[_key];
  }

  var COUNT = args[0],
    count = args[1];

  if (COUNT && !count) {
    throw new Error('ERR syntax error');
  }

  if (!this.data.has(stream)) {
    return [];
  }

  var list = this.data
    .get(stream)
    .slice()
    .reverse();
  var min = start === '-' ? -Infinity : start;
  var max = end === '+' ? Infinity : end;

  var result = list.filter(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      eventId = _ref2[0];

    return min <= parseInt(eventId, 10) && max >= parseInt(eventId, 10);
  });

  if (count) return result.slice(0, count);
  return result;
}
