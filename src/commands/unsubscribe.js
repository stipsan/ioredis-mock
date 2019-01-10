export function unsubscribe(...args) {
  if (args.length === 0) {
    this.channels.removeAllListeners();
  }
  args.forEach(chan => {
    this.channels.removeAllListeners(chan);
  });
  const numberOfSubscribedChannels = this.channels.eventNames().length;
  if (numberOfSubscribedChannels === 0) {
    // TODO: client shall exit the subscribed state
    // if we have no more open subscriptions
  }
  return numberOfSubscribedChannels;
}
