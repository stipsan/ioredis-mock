import {
  getSubscribedChannels,
  subscribeToChannel,
} from '../commands-utils/channel-subscription'

export function subscribe(...args) {
  args.forEach(chan => {
    if (!this.channels.instanceListeners) {
      this.channels.instanceListeners = new Map()
    }

    subscribeToChannel(this, chan, this.channels)
  })

  if (!this.channels.instanceListeners) {
    return 0
  }
  const numberOfSubscribedChannels = getSubscribedChannels(
    this,
    this.channels
  ).length
  if (numberOfSubscribedChannels > 0) {
    this.subscriberMode = true
  }
  return numberOfSubscribedChannels
}

export const subscribeBuffer = subscribe
