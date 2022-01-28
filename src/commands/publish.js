import patternMatchesString from '../commands-utils/patternMatchesString'

export function publish(channel, message) {
  this.channels.emit(channel, message)
  const matchingPatterns = this.patternChannels
    .eventNames()
    .filter(pattern => patternMatchesString(pattern, channel))
  matchingPatterns.forEach(matchingChannel =>
    this.patternChannels.emit(matchingChannel, message, channel)
  )
  const numberOfSubscribers =
    matchingPatterns.length + this.channels.listenerCount(channel)
  return numberOfSubscribers
}
