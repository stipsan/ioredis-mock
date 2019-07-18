import emitMessage from '../commands-utils/emitMessage';

export function psubscribe(...args) {
  args.forEach(pattern => {
    if (this.patternChannels.listenerCount(pattern) === 0) {
      this.patternChannels.on(pattern, (message, channel) => {
        emitMessage(this, channel, message);
      });
    } else {
      // do not register another listener for existing channel pattern
    }
  });
  const numberOfSubscribedChannels = this.patternChannels.eventNames().length;
  if (numberOfSubscribedChannels > 0) {
    this.subscriberMode = true;
  }
  return numberOfSubscribedChannels;
}
