import { emitNotification } from '../keyspace-notifications';

export function expire(key, seconds) {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, seconds * 1000 + Date.now());
  emitNotification(this, 'g', key, 'expire');

  return 1;
}
