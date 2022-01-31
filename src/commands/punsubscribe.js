import {
  getSubscribedChannels,
  unsubscribeFromChannel,
} from '../commands-utils/channel-subscription'

export function punsubscribe(...args) {
  if (args.length === 0) {
    getSubscribedChannels(this, this.patternChannels).forEach(channel => {
      unsubscribeFromChannel(this, channel, this.patternChannels)
    })
  }
  args.forEach(pattern => {
    unsubscribeFromChannel(this, pattern, this.patternChannels)
  })
  const numberOfSubscribedChannels = getSubscribedChannels(
    this,
    this.patternChannels
  ).length
  if (
    numberOfSubscribedChannels +
      getSubscribedChannels(this, this.channels).length ===
    0
  ) {
    this.subscriberMode = false
  }
  return numberOfSubscribedChannels
}

export const punsubscribeBuffer = punsubscribe
