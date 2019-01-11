import {
  emitKeyspaceNotification,
  emitKeyeventNotification,
} from '../keyspace-notifications';

export function rename(key, newKey) {
  const value = this.data.get(key);

  if (this.expires.has(key)) {
    const expire = this.expires.get(key);
    this.expires.delete(key);
    this.expires.set(newKey, expire);
    if (this.keyspaceEvents.K.g) {
      emitKeyspaceNotification(this, key, 'rename_from');
    }
    if (this.keyspaceEvents.E.g) {
      emitKeyeventNotification(this, key, 'rename_from');
    }
  }

  this.data.set(newKey, value);
  this.data.delete(key);
  if (this.keyspaceEvents.K.g) {
    emitKeyspaceNotification(this, newKey, 'rename_to');
  }
  if (this.keyspaceEvents.E.g) {
    emitKeyeventNotification(this, newKey, 'rename_to');
  }
  return 'OK';
}
