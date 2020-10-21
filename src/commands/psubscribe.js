import {
  getSubscribedChannels,
  subscribeToChannel,
} from '../commands-utils/channel-subscription';

export function psubscribe(...args) {
  args.forEach((pattern) => {
    if (!this.patternChannels.instanceListeners) {
      this.patternChannels.instanceListeners = new Map();
    }
    subscribeToChannel(this, pattern, this.patternChannels, true);
  });

  const numberOfSubscribedChannels = getSubscribedChannels(
    this,
    this.patternChannels
  ).length;
  if (numberOfSubscribedChannels > 0) {
    this.subscriberMode = true;
  }
  return numberOfSubscribedChannels;
}
