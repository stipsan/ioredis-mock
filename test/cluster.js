import RedisMock from '../src';

describe('cluster', () => {
  it('can create instance', () => {
    const cluster = new RedisMock.Cluster(['redis://localhost:6379']);
    return expect(cluster instanceof RedisMock.Cluster).toBeTruthy();
  });

  it('can return correct number of nodes', () => {
    const nodes = ['redis://localhost:7001', 'redis://localhost:7002'];
    const cluster = new RedisMock.Cluster(nodes);
    expect(cluster.nodes.length).toEqual(nodes.length);
    expect(
      cluster.nodes.every((node) => node instanceof RedisMock)
    ).toBeTruthy();
  });

  it('can set and get', () => {
    const cluster = new RedisMock.Cluster(['']);
    return cluster
      .set('k', 'v')
      .then(() => cluster.get('k'))
      .then((v) => expect(v).toEqual('v'));
  });
});
