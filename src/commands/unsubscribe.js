import {
  getSubscribedChannels,
  unsubscribeFromChannel,
} from '../commands-utils/channel-subscription';

export function unsubscribe(...args) {
  if (args.length === 0) {
    getSubscribedChannels(this, this.channels).forEach((channel) => {
      unsubscribeFromChannel(this, channel, this.channels);
    });

    return 0;
  }

  args.forEach((chan) => {
    unsubscribeFromChannel(this, chan, this.channels);
  });

  const numberOfSubscribedChannels = getSubscribedChannels(
    this,
    this.channels
  ).length;
  if (
    numberOfSubscribedChannels +
      getSubscribedChannels(this, this.patternChannels).length ===
    0
  ) {
    this.subscriberMode = false;
  }
  return numberOfSubscribedChannels;
}
