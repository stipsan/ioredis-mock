import expect from 'expect';

import MockRedis from '../src';

describe('multipleMocks', () => {
  it('should be possible to create a second IORedis client, which is working on shared data with the first client', () => {
    const client1 = new MockRedis();
    const client2 = client1.createConnectedClient();
    client1.hset('testing', 'test', '2').then(() => {
      client2.hget('testing', 'test').then((val) => expect(val).toBe('2'));
    });
  });

  it('should be possible to create a second IORedis client, which is working on shared channels with the first client', (done) => {
    const client1 = new MockRedis();
    const client2 = client1.createConnectedClient();
    client1.on('message', (channel, message) => {
      expect(channel).toBe('channel');
      expect(message).toBe('hello');
      done();
    });
    client1.subscribe('channel');
    client2.publish('channel', 'hello');
  });
});
