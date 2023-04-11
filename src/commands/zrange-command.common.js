import orderBy from 'lodash.orderby'

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

function parseLexLimit(input) {
  if (input === '-') {
    return { value: '-', isExclusive: false }
  }

  if (input === '+') {
    return { value: '+', isExclusive: false }
  }

  let str = input
  let exclusive = false

  if (str[0] === '(') {
    str = str.substr(1, str.length)
    exclusive = true
  } else if (str[0] === '[') {
    str = str.substr(1, str.length)
  } else {
    // [ or ( are required
    throw new Error('ERR synax error')
  }

  return {
    value: str,
    isExclusive: exclusive,
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

export function filterLexPredicate(min, max) {
  return it => {
    if (
      (min.value !== '-' && it.value < min.value) ||
      (min.isExclusive && it.value === min.value)
    ) {
      return false
    }

    if (
      (max.value !== '+' && it.value > max.value) ||
      (max.isExclusive && it.value === max.value)
    ) {
      return false
    }

    return true
  }
}

function streq(a, b) {
  return a.toString().toLowerCase() === b.toString().toLowerCase()
}

export const DIRECTION_REVERSE = 'reverse'
const DIRECTION_FORWARD = 'forward'

export const RANGE_RANK = 'rank'
export const RANGE_LEX = 'lex'
export const RANGE_SCORE = 'score'

/** https://github.com/redis/redis/blob/f651708a19b4fc8137eec13180fcea39e68fb284/src/t_zset.c#L3589 */
export function zrangeBaseCommand(
  args,
  argsStart = 0,
  store = false,
  inputRange = null,
  inputDirection = null
) {
  const key = args[argsStart]
  const map = this.data.get(key)
  if (!map) {
    return []
  }

  // @TODO investigate a more stable way to detect sorted lists
  if (this.data.has(key) && !(this.data.get(key) instanceof Map)) {
    return []
  }

  let withScores = false
  let offset = 0
  let limit = null
  let direction = inputDirection || DIRECTION_FORWARD
  let range = inputRange || RANGE_RANK
  let start
  let end

  let minIdx = argsStart + 1
  let maxIdx = argsStart + 2

  /* Step 1: Skip the <src> <min> <max> args and parse remaining optional arguments. */
  for (let j = argsStart + 3; j < args.length; j++) {
    const leftargs = args.length - j - 1

    if (!store && streq(args[j], 'withscores')) {
      withScores = 1
    } else if (streq(args[j], 'limit') && leftargs >= 2) {
      offset = parseInt(args[j + 1], 10)
      limit = parseInt(args[j + 2], 10)
      if (Number.isNaN(offset) || Number.isNaN(limit)) {
        throw new Error('ERR syntax error')
      }

      j += 2
    } else if (!inputDirection && streq(args[j], 'rev')) {
      direction = DIRECTION_REVERSE
    } else if (!inputRange && streq(args[j], 'bylex')) {
      range = RANGE_LEX
    } else if (!inputRange && streq(args[j], 'byscore')) {
      range = RANGE_SCORE
    } else {
      throw new Error('ERR syntax error')
    }
  }

  if (limit !== null && range === RANGE_RANK) {
    throw new Error(
      'ERR syntax error, LIMIT is only supported in combination with either BYSCORE or BYLEX'
    )
  }

  if (withScores && range === RANGE_LEX) {
    throw new Error(
      'ERR syntax error, WITHSCORES not supported in combination with BYLEX'
    )
  }

  if (
    direction === DIRECTION_REVERSE &&
    (range === RANGE_SCORE || range === RANGE_LEX)
  ) {
    /* Range is given as [max,min] */
    const tmp = maxIdx
    maxIdx = minIdx
    minIdx = tmp
  }

  /* Step 2: Parse the range. */
  switch (range) {
    case RANGE_RANK:
      /* Z[REV]RANGE, ZRANGESTORE [REV]RANGE */
      start = parseInt(args[minIdx], 10)
      end = parseInt(args[maxIdx], 10)

      if (Number.isNaN(start) || Number.isNaN(end)) {
        throw new Error('ERR syntax error ')
      }
      break

    case RANGE_SCORE:
      /* Z[REV]RANGEBYSCORE, ZRANGESTORE [REV]RANGEBYSCORE */
      start = parseLimit(args[minIdx])
      end = parseLimit(args[maxIdx])

      break

    case RANGE_LEX:
      /* Z[REV]RANGEBYLEX, ZRANGESTORE [REV]RANGEBYLEX */
      start = parseLexLimit(args[minIdx])
      end = parseLexLimit(args[maxIdx])

      break
    default:
      throw new Error('ERR syntax error')
  }

  /* Step 3: Lookup the key and get the range. */
  let sort
  if (direction === DIRECTION_REVERSE) {
    sort = ['desc', 'desc']
  }

  let ordered
  const inputArray = Array.from(map.values())
  if (range === RANGE_SCORE) {
    // TODO If items have different scores, result is unspecified

    const filteredArray = inputArray.filter(filterPredicate(start, end))
    ordered = orderBy(filteredArray, ['score', 'value'], sort)
  } else if (range === RANGE_LEX) {
    const filteredArray = inputArray.filter(filterLexPredicate(start, end))
    ordered = orderBy(filteredArray, ['score', 'value'], sort)
  } else {
    ordered = slice(orderBy(inputArray, ['score', 'value'], sort), start, end)
  }

  // TODO: handle STORE
  if (limit !== null) {
    ordered = offsetAndLimit(ordered, offset, limit)
  }

  if (withScores) {
    return ordered.flatMap(it => [it.value, `${it.score}`])
  }

  return ordered.map(it => it.value)
}
