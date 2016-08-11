export function rpoplpush(source, destination) {
  if (this.data[source] && !(this.data[source] instanceof Array)) {
    throw new Error(`Key ${source} does not contain a list`);
  }
  if (this.data[destination] && !(this.data[destination] instanceof Array)) {
    throw new Error(`Key ${destination} does not contain a list`);
  }

  if (!this.data[source] || this.data[source] === []) {
    return null;
  }

  if (!this.data[destination]) {
    this.data[destination] = [];
  }

  const item = this.data[source].pop();
  this.data[destination].unshift(item);

  return item;
}
