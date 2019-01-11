import {
  emitKeyspaceNotification,
  emitKeyeventNotification,
} from '../keyspace-notifications';

export function del(...keys) {
  let deleted = 0;
  keys.forEach(key => {
    if (this.data.has(key)) {
      deleted++;
      if (this.keyspaceEvents.K.g) {
        emitKeyspaceNotification(this, key, 'del');
      }
      if (this.keyspaceEvents.E.g) {
        emitKeyeventNotification(this, key, 'del');
      }
    }
    this.data.delete(key);
  });
  return deleted;
}
