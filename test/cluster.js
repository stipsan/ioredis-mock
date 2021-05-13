import Redis from 'ioredis';

describe('cluster', () => {
  it('can create instance', () => {
    const cluster = new Redis.Cluster(['redis://localhost:6379']);
    return expect(cluster instanceof Redis.Cluster).toBeTruthy();
  });

  it('can return correct number of nodes', () => {
    const nodes = ['redis://localhost:7001', 'redis://localhost:7002'];
    const cluster = new Redis.Cluster(nodes);
    expect(cluster.nodes.length).toEqual(nodes.length);
    expect(cluster.nodes.every((node) => node instanceof Redis)).toBeTruthy();
  });

  it('can set and get', () => {
    const cluster = new Redis.Cluster(['']);
    return cluster
      .set('k', 'v')
      .then(() => cluster.get('k'))
      .then((v) => expect(v).toEqual('v'));
  });
});
