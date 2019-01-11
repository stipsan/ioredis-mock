export function publish(channel, message) {
  this.channels.emit(channel, message);
  const numberOfSubscribers = this.channels.listenerCount(channel);
  return numberOfSubscribers;
}
