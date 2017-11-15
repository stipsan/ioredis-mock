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
  } else if (end - start < 0) {
    return Array.from(arr).reverse().slice(start, end + 1);
  }
  return arr.slice(start, end + 1);
}
