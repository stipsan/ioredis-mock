import emitMessage from '../commands-utils/emitMessage';

export function subscribe(...args) {
  args.forEach(chan => {
    if (this.channels.listenerCount(chan) === 0) {
      this.channels.on(chan, message => {
        emitMessage(this, chan, message);
      });
    } else {
      // do not register another listener for existing channel
    }
  });
  const numberOfSubscribedChannels = this.channels.eventNames().length;
  if (numberOfSubscribedChannels > 0) {
    this.subscriberMode = true;
  }
  return numberOfSubscribedChannels;
}
