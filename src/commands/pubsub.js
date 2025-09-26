import patternMatchesString from '../commands-utils/patternMatchesString'

export function pubsub(subCommand, ...args) {
  switch (subCommand) {
    case 'CHANNELS': {
      let channels = []
      const pattern = args[0]

      this.channels?.instanceListeners?.forEach((instanceMap, channel) => {
        channels.push(channel)
      })

      if (pattern) {
        channels = channels.filter(x => patternMatchesString(pattern, x))
      }

      return channels
    }
    case 'NUMSUB': {
      let result = []

      args.forEach(channel => {
        result.push(channel)
        result.push(this.channels?.instanceListeners?.get(channel)?.size || 0)
      })

      return result
    }
    default: {
      throw new Error('Currently not implemented as a mock')
    }
  }
}

export const pubsubBuffer = pubsub
