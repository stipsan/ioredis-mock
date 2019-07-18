export function unsubscribe(...args) {
  if (args.length === 0) {
    this.channels.removeAllListeners();
  }
  args.forEach(chan => {
    this.channels.removeAllListeners(chan);
  });
  const numberOfSubscribedChannels = this.channels.eventNames().length;
  if (
    numberOfSubscribedChannels + this.patternChannels.eventNames().length ===
    0
  ) {
    this.subscriberMode = false;
  }
  return numberOfSubscribedChannels;
}
