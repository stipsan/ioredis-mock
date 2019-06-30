export function unsubscribe(...args) {
  if (args.length === 0) {
    this.channels.removeAllListeners();
  }
  args.forEach(chan => {
    this.channels.removeAllListeners(chan);
  });
  const numberOfSubscribedChannels = this.channels.eventNames().length;
  if (numberOfSubscribedChannels === 0) {
    this.subscriberMode = false;
  }
  return numberOfSubscribedChannels;
}
