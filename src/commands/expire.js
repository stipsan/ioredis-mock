import {
  emitKeyspaceNotification,
  emitKeyeventNotification,
} from '../keyspace-notifications';

export function expire(key, seconds) {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, seconds * 1000 + Date.now());
  if (this.keyspaceEvents.K.g) {
    emitKeyspaceNotification(this, key, 'expire');
  }
  if (this.keyspaceEvents.E.g) {
    emitKeyeventNotification(this, key, 'expire');
  }

  return 1;
}
