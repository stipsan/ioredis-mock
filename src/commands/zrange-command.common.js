function normalizeIndex(index, array) {
  if (index < 0) {
    return -index > array.length ? -1 : array.length + index;
  }
  return index;
}

export function slice(arr, s, e) {
  const start = normalizeIndex(s, arr);
  const end = normalizeIndex(e, arr);
  if (end === -1) {
    return [];
  }
  if (end - start < 0) {
    return Array.from(arr)
      .reverse()
      .slice(start, end + 1);
  }
  return arr.slice(start, end + 1);
}

export function parseLimit(input) {
  let str = `${input}`;
  let strict = false;
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

export function filterPredicate(min, max) {
  return it => {
    if (it.score < min.value || (min.isStrict && it.score === min.value)) {
      return false;
    }

    if (it.score > max.value || (max.isStrict && it.score === max.value)) {
      return false;
    }

    return true;
  };
}
