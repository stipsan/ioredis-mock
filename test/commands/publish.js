import MockRedis from 'ioredis';

describe('publish', () => {
  it('should return 0 when publishing without subscribers', () => {
    const redis = new MockRedis();
    return redis
      .publish('emails', 'clark@daily.planet')
      .then((subscribers) => expect(subscribers).toBe(0));
  });

  it('should return 1 when publishing with a single subscriber', () => {
    const redisPubSub = new MockRedis();
    const redis2 = redisPubSub.createConnectedClient();
    redisPubSub.subscribe('emails');
    return redis2
      .publish('emails', 'clark@daily.planet')
      .then((subscribers) => expect(subscribers).toBe(1));
  });

  it('should publish a message, which can be received by a previous subscribe', (done) => {
    const redisPubSub = new MockRedis();
    const redis2 = redisPubSub.createConnectedClient();
    redisPubSub.on('message', (channel, message) => {
      expect(channel).toBe('emails');
      expect(message).toBe('clark@daily.planet');
      done();
    });
    redisPubSub.subscribe('emails');
    redis2.publish('emails', 'clark@daily.planet');
  });

  it('should emit messageBuffer event when a Buffer message is published on a subscribed channel', (done) => {
    const redisPubSub = new MockRedis();
    const redis2 = redisPubSub.createConnectedClient();
    const buffer = Buffer.alloc(8);
    redisPubSub.on('messageBuffer', (channel, message) => {
      expect(channel).toBe('emails');
      expect(message).toBe(buffer);
      done();
    });
    redisPubSub.subscribe('emails');
    redis2.publish('emails', buffer);
  });

  it('should return 1 when publishing with a single pattern subscriber', () => {
    const redisPubSub = new MockRedis();
    const redis2 = redisPubSub.createConnectedClient();
    redisPubSub.psubscribe('emails.*');
    return redis2
      .publish('emails.urgent', 'clark@daily.planet')
      .then((subscribers) => expect(subscribers).toBe(1));
  });

  it('should publish a message, which can be received by a previous psubscribe', (done) => {
    const redisPubSub = new MockRedis();
    const redis2 = redisPubSub.createConnectedClient();
    redisPubSub.on('pmessage', (pattern, channel, message) => {
      expect(pattern).toBe('emails.*');
      expect(channel).toBe('emails.urgent');
      expect(message).toBe('clark@daily.planet');
      done();
    });
    redisPubSub.psubscribe('emails.*');
    redis2.publish('emails.urgent', 'clark@daily.planet');
  });

  it('should emit a pmessageBuffer event when a Buffer message is published matching a psubscribed pattern', (done) => {
    const redisPubSub = new MockRedis();
    const redis2 = redisPubSub.createConnectedClient();
    const buffer = Buffer.alloc(0);
    redisPubSub.on('pmessageBuffer', (pattern, channel, message) => {
      expect(pattern).toBe('emails.*');
      expect(channel).toBe('emails.urgent');
      expect(message).toBe(buffer);
      done();
    });
    redisPubSub.psubscribe('emails.*');
    redis2.publish('emails.urgent', buffer);
  });
});
