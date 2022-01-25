import Redis from 'ioredis';
import parseKeyspaceEvents from '../src/keyspace-notifications';

describe('parseKeyspaceEvents', () => {
  it('should interpret an empty string as all notifications disabled', () => {
    const emptyString = '';
    const notificationConfig = parseKeyspaceEvents(emptyString);
    expect(notificationConfig.K.g).toBe(false);
    expect(notificationConfig.K.string).toBe(false);
    expect(notificationConfig.K.l).toBe(false);
    expect(notificationConfig.K.s).toBe(false);
    expect(notificationConfig.K.h).toBe(false);
    expect(notificationConfig.K.z).toBe(false);
    expect(notificationConfig.K.x).toBe(false);
    expect(notificationConfig.K.e).toBe(false);
    expect(notificationConfig.E.g).toBe(false);
    expect(notificationConfig.E.string).toBe(false);
    expect(notificationConfig.E.l).toBe(false);
    expect(notificationConfig.E.s).toBe(false);
    expect(notificationConfig.E.h).toBe(false);
    expect(notificationConfig.E.z).toBe(false);
    expect(notificationConfig.E.x).toBe(false);
    expect(notificationConfig.E.e).toBe(false);
  });

  it('should interpret "gxK" as generic and expired keyspace events', () => {
    const notificationConfig = parseKeyspaceEvents('gxK');
    expect(notificationConfig.K.g).toBe(true);
    expect(notificationConfig.K.string).toBe(false);
    expect(notificationConfig.K.l).toBe(false);
    expect(notificationConfig.K.s).toBe(false);
    expect(notificationConfig.K.h).toBe(false);
    expect(notificationConfig.K.z).toBe(false);
    expect(notificationConfig.K.x).toBe(true);
    expect(notificationConfig.K.e).toBe(false);
    expect(notificationConfig.E.g).toBe(false);
    expect(notificationConfig.E.string).toBe(false);
    expect(notificationConfig.E.l).toBe(false);
    expect(notificationConfig.E.s).toBe(false);
    expect(notificationConfig.E.h).toBe(false);
    expect(notificationConfig.E.z).toBe(false);
    expect(notificationConfig.E.x).toBe(false);
    expect(notificationConfig.E.e).toBe(false);
  });

  it('should interpret "AKE" as all notifications enabled', () => {
    const notificationConfig = parseKeyspaceEvents('AKE');
    expect(notificationConfig.K.g).toBe(true);
    expect(notificationConfig.K.string).toBe(true);
    expect(notificationConfig.K.l).toBe(true);
    expect(notificationConfig.K.s).toBe(true);
    expect(notificationConfig.K.h).toBe(true);
    expect(notificationConfig.K.z).toBe(true);
    expect(notificationConfig.K.x).toBe(true);
    expect(notificationConfig.K.e).toBe(true);
    expect(notificationConfig.E.g).toBe(true);
    expect(notificationConfig.E.string).toBe(true);
    expect(notificationConfig.E.l).toBe(true);
    expect(notificationConfig.E.s).toBe(true);
    expect(notificationConfig.E.h).toBe(true);
    expect(notificationConfig.E.z).toBe(true);
    expect(notificationConfig.E.x).toBe(true);
    expect(notificationConfig.E.e).toBe(true);
  });
});

describe('keyspaceNotifications', () => {
  it('should appear when configured and the triggering event occurs', (done) => {
    const redis = new Redis({ notifyKeyspaceEvents: 'gK' }); // gK: generic keyspace
    const redisPubSub = redis.duplicate();
    redisPubSub.on('message', (channel, message) => {
      expect(channel).toBe('__keyspace@0__:key');
      expect(message).toBe('del');
      done();
    });
    redisPubSub
      .subscribe('__keyspace@0__:key')
      .then(() => redis.set('key', 'value').then(() => redis.del('key')));
  });

  it('should not appear when not configured and the triggering event occurs', (done) => {
    const redis = new Redis({ notifyKeyspaceEvents: '' }); // empty string: not configured
    redis.on('message', (channel, message) => {
      throw new Error(`should not receive ${message} on ${channel}`);
    });
    redis.set('key', 'value').then(() => redis.del('key'));
    // wait for notification to NOT appear
    setTimeout(() => done(), 40);
  });

  it('should appear on a connected second mock instance when configured and the triggering event occurs', (done) => {
    const redis = new Redis({ notifyKeyspaceEvents: 'gK' }); // gK: generic keyspace
    const redis2 = redis.createConnectedClient({ notifyKeyspaceEvents: 'gK' });
    redis2.on('message', (channel, message) => {
      expect(channel).toBe('__keyspace@0__:key');
      expect(message).toBe('del');
      done();
    });
    redis2
      .subscribe('__keyspace@0__:key')
      .then(() => redis.set('key', 'value').then(() => redis.del('key')));
  });
});

describe('keyeventNotifications', () => {
  it('should appear when configured and the triggering event occurs', (done) => {
    const redis = new Redis({ notifyKeyspaceEvents: 'gE' }); // gK: generic keyevent
    const redisPubSub = redis.duplicate();
    redisPubSub.on('message', (channel, message) => {
      expect(channel).toBe('__keyevent@0__:del');
      expect(message).toBe('key');
      done();
    });
    redisPubSub
      .subscribe('__keyevent@0__:del')
      .then(() => redis.set('key', 'value').then(() => redis.del('key')));
  });
});
