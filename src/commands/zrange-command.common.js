function normalizeIndex(index, array) {
  if (index < 0) {
    return -index > array.length ? 0 : array.length + index;
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

function normalizeCountToIndex(offset, count, array) {
  if (count < 0) {
    return -count > array.length ? 0 : array.length + count;
  }
  return offset + count;
}

export function offsetAndLimit(arr, offset, count) {
  if (count === 0) {
    return [];
  }
  const end = normalizeCountToIndex(offset, count, arr);
  return arr.slice(offset, end);
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
  return (it) => {
    if (it.score < min.value || (min.isStrict && it.score === min.value)) {
      return false;
    }

    if (it.score > max.value || (max.isStrict && it.score === max.value)) {
      return false;
    }

    return true;
  };
}

// this emulates the way Redis handles parsing these arguments
// see https://github.com/antirez/redis/blob/06d490342f51cff316588a7a45124cc410b7d050/src/t_zset.c#L2556
export function getWithScoresAndLimit(args) {
  let remaining = args.length;
  let pos = 0;
  let withScores = false;
  let limit = null;
  let offset = null;

  while (remaining > 0) {
    if (remaining >= 1 && args[pos].toUpperCase() === 'WITHSCORES') {
      withScores = true;
      pos += 1;
      remaining -= 1;
    } else if (remaining >= 3 && args[pos].toUpperCase() === 'LIMIT') {
      offset = parseInt(args[pos + 1], 10);
      limit = parseInt(args[pos + 2], 10);
      pos += 3;
      remaining -= 3;
    } else {
      throw new Error('ERR syntax error');
    }
  }

  return { withScores, limit, offset };
}
