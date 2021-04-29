import emitMessage from './emitMessage';

export function getSubscribedChannels(instance, channelStore) {
  const subscribedChannels = [];
  if (!channelStore.instanceListeners) {
    return [];
  }
  channelStore.instanceListeners.forEach((instanceMap, channel) => {
    if (instanceMap.has(instance)) {
      subscribedChannels.push(channel);
    }
  });
  return subscribedChannels;
}

export function subscribeToChannel(instance, chan, channels, isPattern) {
  if (!channels.instanceListeners.has(chan)) {
    channels.instanceListeners.set(chan, new Map());
  }

  if (channels.instanceListeners.get(chan).has(instance)) {
    // do not register another listener for existing channel
    return;
  }
  // Pattern events include the channel, regular events do not, so we pass chan in directly
  const listener = (message, channel) =>
    emitMessage(
      instance,
      isPattern ? channel : chan,
      message,
      isPattern ? chan : undefined
    );
  channels.on(chan, listener);
  channels.instanceListeners.get(chan).set(instance, listener);
}

export function unsubscribeFromChannel(instance, chan, channels) {
  if (
    !channels.instanceListeners ||
    channels.instanceListeners.has(chan) === false
  ) {
    // there are no subscriptions to this channel
    return;
  }

  const channelMap = channels.instanceListeners.get(chan);

  if (channelMap.has(instance) === false) {
    // this instance is not subscribed to the channel
    return;
  }

  const listener = channelMap.get(instance);

  channels.removeListener(chan, listener);
  channelMap.delete(instance);
  if (channelMap.size === 0) {
    // tidy up: remove the map if it's empty
    channels.instanceListeners.delete(chan);
  }
}
