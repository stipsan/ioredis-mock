export function exists(...keys) {
  return keys.reduce((totalExists, key) => {
    if ({}.hasOwnProperty.call(this.data, key)) {
      return totalExists + 1;
    }
    return totalExists;
  }, 0);
}
