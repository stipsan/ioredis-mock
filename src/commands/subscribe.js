import emitMessage from '../commands-utils/emitMessage';

export function subscribe(...args) {
  args.forEach(chan => {
    if (this.channels.listenerCount(chan) === 0) {
      this.channels.on(chan, message => {
        emitMessage(this, chan, message);
      });
      // TODO: client shall enter the subscribed state
      // and not issue any other commands, except
      // SUBSCRIBE, PSUBSCRIBE, UNSUBSCRIBE, PUNSUBSCRIBE, PING, QUIT
    } else {
      // do not register another listener for existing channel
    }
  });
  const numberOfSubscribedChannels = this.channels.eventNames().length;
  return numberOfSubscribedChannels;
}
