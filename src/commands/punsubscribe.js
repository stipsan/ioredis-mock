export function punsubscribe(...args) {
  if (args.length === 0) {
    this.patternChannels.removeAllListeners();
  }
  args.forEach(pattern => {
    this.patternChannels.removeAllListeners(pattern);
  });
  const numberOfSubscribedChannels = this.patternChannels.eventNames().length;
  if (numberOfSubscribedChannels + this.channels.eventNames().length === 0) {
    this.subscriberMode = false;
  }
  return numberOfSubscribedChannels;
}
