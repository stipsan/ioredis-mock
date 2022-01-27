const allEventsDisabled = {
  g: false,
  string: false,
  l: false,
  s: false,
  h: false,
  z: false,
  x: false,
  e: false,
};

function parseEvents(keyspaceEventsConfigString) {
  const result = { ...allEventsDisabled};
  const allEvents = 'g$lshzxe';
  const unAliasedString = keyspaceEventsConfigString.replace('A', allEvents);
  result.g = unAliasedString.includes('g');
  result.string = unAliasedString.includes('$');
  result.l = unAliasedString.includes('l');
  result.s = unAliasedString.includes('s');
  result.h = unAliasedString.includes('h');
  result.z = unAliasedString.includes('z');
  result.x = unAliasedString.includes('x');
  result.e = unAliasedString.includes('e');
  return result;
}

export default function parseKeyspaceEvents(keyspaceEventsConfigString) {
  const keyspaceConfig = {
    K: { ...allEventsDisabled},
    E: { ...allEventsDisabled},
  };
  const isKeyspace = keyspaceEventsConfigString.includes('K');
  const isKeyevent = keyspaceEventsConfigString.includes('E');
  if (isKeyspace) {
    keyspaceConfig.K = parseEvents(keyspaceEventsConfigString);
  }
  if (isKeyevent) {
    keyspaceConfig.E = parseEvents(keyspaceEventsConfigString);
  }
  return keyspaceConfig;
}

function createChannelString(type, name) {
  const database = 0; // if we support multiple databases in the future, we might want to set this to non-zero
  const typeString = type === 'K' ? 'keyspace' : 'keyevent';
  const channel = `__${typeString}@${database}__:${name}`;
  return channel;
}

export function emitNotification(redisMock, notifType, key, event) {
  if (redisMock.keyspaceEvents.K[notifType] === true) {
    redisMock.publish(createChannelString('K', key), event);
  }
  if (redisMock.keyspaceEvents.E[notifType] === true) {
    redisMock.publish(createChannelString('E', event), key);
  }
}
