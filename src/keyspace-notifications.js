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
  const result = Object.assign({}, allEventsDisabled);
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
    K: Object.assign({}, allEventsDisabled),
    E: Object.assign({}, allEventsDisabled),
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

export function emitNotification(
  redisMock,
  notifType,
  key,
  event,
  database = 0
) {
  let channel = null;
  let message = null;
  if (redisMock.keyspaceEvents.K[notifType] === true) {
    channel = `__keyspace@${database}__:${key}`;
    message = event;
  }
  if (redisMock.keyspaceEvents.E[notifType] === true) {
    channel = `__keyevent@${database}__:${event}`;
    message = key;
  }
  if (channel !== null && message !== null) {
    redisMock.publish(channel, message);
  }
}
