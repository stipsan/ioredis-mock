import orderBy from 'lodash.orderby';

export function slice(arr, start, end) {
  return arr.slice(start, end === -1 ? undefined : end + 1)
}

function normalizeCountToIndex(offset, count, array) {
  if (count < 0) {
    return -count > array.length ? 0 : array.length + count
  }
  return offset + count
}

export function offsetAndLimit(arr, offset, count) {
  if (count === 0) {
    return []
  }
  const end = normalizeCountToIndex(offset, count, arr)
  return arr.slice(offset, end)
}

export function parseLimit(input) {
  let str = `${input}`
  let strict = false
  if (str[0] === '(') {
    str = str.substr(1, str.length)
    strict = true
  } else if (str === '-inf') {
    return { value: -Infinity, isStrict: true }
  } else if (str === '+inf') {
    return { value: +Infinity, isStrict: true }
  }

  return {
    value: parseInt(str, 10),
    isStrict: strict,
  }
}

export function filterPredicate(min, max) {
  return it => {
    if (it.score < min.value || (min.isStrict && it.score === min.value)) {
      return false
    }

    if (it.score > max.value || (max.isStrict && it.score === max.value)) {
      return false
    }

    return true
  }
}

// this emulates the way Redis handles parsing these arguments
// see https://github.com/antirez/redis/blob/06d490342f51cff316588a7a45124cc410b7d050/src/t_zset.c#L2556
export function getWithScoresAndLimit(args) {
  let remaining = args.length
  let pos = 0
  let withScores = false
  let limit = null
  let offset = null

  while (remaining > 0) {
    if (remaining >= 1 && args[pos].toUpperCase() === 'WITHSCORES') {
      withScores = true
      pos += 1
      remaining -= 1
    } else if (remaining >= 3 && args[pos].toUpperCase() === 'LIMIT') {
      offset = parseInt(args[pos + 1], 10)
      limit = parseInt(args[pos + 2], 10)
      pos += 3
      remaining -= 3
    } else {
      throw new Error('ERR syntax error')
    }
  }

  return { withScores, limit, offset }
}


function streq(a, b) {
  return a.toString().toLowerCase() === b.toString().toLowerCase()
}

export const DIRECTION_REVERSE = 'reverse';
const DIRECTION_FORWARD = 'forward';

export const RANGE_RANK = 'rank';
export const RANGE_LEX = 'lex';
export const RANGE_SCORE = 'score';

/** https://github.com/redis/redis/blob/f651708a19b4fc8137eec13180fcea39e68fb284/src/t_zset.c#L3589 */
export function zrangeBaseCommand(args, argsStart = 0, store = false, inputRange = null, inputDirection = null) {
  const key = args[argsStart];
  const map = this.data.get(key)
  if (!map) {
    return []
  }

  // @TODO investigate a more stable way to detect sorted lists
  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return []
  }

  let withScores = false;
  let offset = 0;
  let limit = null;
  let direction = inputDirection || DIRECTION_FORWARD;
  let range = inputRange || RANGE_RANK;
  let start;
  let end;

  const minIdx = argsStart + 1;
  const maxIdx = argsStart + 2;


  /* Step 1: Skip the <src> <min> <max> args and parse remaining optional arguments. */
  for (let j = argsStart + 3; j < args.length; j++) {
    const leftargs = args.length - j - 1;
    
    if (!store && streq(args[j], 'withscores')) {
      withScores = 1;
    } else if (streq(args[j], 'limit') && leftargs >= 2) {
      offset = parseInt(args[j + 1], 10);
      limit = parseInt(args[j + 2], 10);
      if (Number.isNaN(offset) || Number.isNaN(limit)) {
        throw new Error('ERR syntax error')
      }

      j += 2;
    } else if (!inputDirection && streq(args[j], 'rev')) {
      direction = DIRECTION_REVERSE;
    } else if (!inputRange && streq(args[j] , 'bylex')) {
      range = RANGE_LEX;
    } else if (!inputRange && streq(args[j], 'byscore')) {
      range = RANGE_SCORE;
    } else {
       throw new Error('ERR syntax error');
    }
  }

  if (limit !== null && range === RANGE_RANK) {
    throw new Error('ERR syntax error, LIMIT is only supported in combination with either BYSCORE or BYLEX');
  }

  if (withScores && range === RANGE_LEX) {
    throw new Error('ERR syntax error, WITHSCORES not supported in combination with BYLEX');
  }

  /* Step 2: Parse the range. */
  switch (range) {
    case RANGE_RANK:
      /* Z[REV]RANGE, ZRANGESTORE [REV]RANGE */
      start = parseInt(args[minIdx], 10);
      end = parseInt(args[maxIdx], 10);

      if (Number.isNaN(start) || Number.isNaN(end)) {
        throw new Error('ERR syntax error ');
      }
      break;

    case RANGE_SCORE:
        /* Z[REV]RANGEBYSCORE, ZRANGESTORE [REV]RANGEBYSCORE */
        start = parseLimit(args[minIdx]);
        end = parseLimit(args[maxIdx]);
        
        break;
    // FIXME: handle RANGE_LEX
    // case ZRANGE_LEX:
    //     /* Z[REV]RANGEBYLEX, ZRANGESTORE [REV]RANGEBYLEX */
    //     if (zslParseLexRange(c->argv[minidx], c->argv[maxidx], &lexrange) != C_OK) {
    //         addReplyError(c, "min or max not valid string range item");
    //         return;
    //     }
    //     break;
    // }
    default: 
      throw new Error('ERR syntax error');
  }
  
  let sort;
  if (direction === DIRECTION_REVERSE) {
    sort = ['desc', 'desc']
  }

  let ordered;
  if (range === RANGE_SCORE) {
    const filteredArray = Array.from(map.values()).filter(
      filterPredicate(start, end)
    )

    ordered = orderBy(filteredArray, ['score', 'value'], sort);
  } 
  // FIXME: handle RANGE_LEX
  else {
    ordered = slice(
      orderBy(Array.from(map.values()), ['score', 'value'], sort),
      start,
      end
    )
  }

  if (limit !== null) {
    ordered = offsetAndLimit(ordered, offset, limit)
  }
  
  if (withScores) {
    return ordered.flatMap(it => [it.value, `${it.score}`])
  }

  return ordered.map(it => it.value);
}
