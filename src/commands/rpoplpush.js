export function rpoplpush(source, destination) {
  if (this.data.has(source) && !(this.data.get(source) instanceof Array)) {
    throw new Error(`Key ${source} does not contain a list`);
  }
  if (this.data.has(destination) && !(this.data.get(destination) instanceof Array)) {
    throw new Error(`Key ${destination} does not contain a list`);
  }

  if (!this.data.has(source) || this.data.get(source).length === 0) {
    return null;
  }

  if (!this.data.has(destination)) {
    this.data.set(destination, []);
  }

  const item = this.data.get(source).pop();
  this.data.get(destination).unshift(item);

  return item;
}
