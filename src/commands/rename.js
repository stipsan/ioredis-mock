import { emitNotification } from '../keyspace-notifications';

export function rename(key, newKey) {
  const value = this.data.get(key);

  if (this.expires.has(key)) {
    const expire = this.expires.get(key);
    this.expires.delete(key);
    this.expires.set(newKey, expire);
    emitNotification(this, 'g', key, 'rename_from');
  }

  this.data.set(newKey, value);
  this.data.delete(key);
  emitNotification(this, 'g', newKey, 'rename_to');
  return 'OK';
}
