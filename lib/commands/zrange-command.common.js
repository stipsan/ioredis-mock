'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.slice = slice;
exports.parseLimit = parseLimit;
exports.filterPredicate = filterPredicate;
function normalizeIndex(index, array) {
  if (index < 0) {
    return -index > array.length ? -1 : array.length + index;
  }
  return index;
}

function slice(arr, s, e) {
  var start = normalizeIndex(s, arr);
  var end = normalizeIndex(e, arr);
  if (end === -1) {
    return [];
  } else if (end - start < 0) {
    return Array.from(arr)
      .reverse()
      .slice(start, end + 1);
  }
  return arr.slice(start, end + 1);
}

function parseLimit(input) {
  var str = '' + input;
  var strict = false;
  if (str[0] === '(') {
    str = str.substr(1, str.length);
    strict = true;
  } else if (str === '-inf') {
    return { value: -Infinity, isStrict: true };
  } else if (str === '+inf') {
    return { value: +Infinity, isStrict: true };
  }

  return {
    value: parseInt(str, 10),
    isStrict: strict,
  };
}

function filterPredicate(min, max) {
  return function(it) {
    if (it.score < min.value || (min.isStrict && it.score === min.value)) {
      return false;
    }

    if (it.score > max.value || (max.isStrict && it.score === max.value)) {
      return false;
    }

    return true;
  };
}
