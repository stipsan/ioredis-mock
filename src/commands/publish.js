import minimatch from 'minimatch';

export function publish(channel, message) {
  this.channels.emit(channel, message);
  const matchingPatterns = this.patternChannels
    .eventNames()
    .filter(pattern => minimatch(channel, pattern));
  matchingPatterns.forEach(matchingChannel =>
    this.patternChannels.emit(matchingChannel, message, channel)
  );
  const numberOfSubscribers =
    matchingPatterns.length + this.channels.listenerCount(channel);
  return numberOfSubscribers;
}
