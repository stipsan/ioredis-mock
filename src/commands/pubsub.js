import patternMatchesString from '../commands-utils/patternMatchesString'

export function pubsub(subCommand, pattern) {
  switch (subCommand) {
    case 'CHANNELS': {
      let channels = []

      this.channels?.instanceListeners?.forEach((instanceMap, channel) => {
        channels.push(channel)
      })

      if (pattern) {
        channels = channels.filter(x => patternMatchesString(pattern, x))
      }

      return channels
    }
    default: {
      throw new Error('Currently not implemented as a mock')
    }
  }
}

export const pubsubBuffer = pubsub
