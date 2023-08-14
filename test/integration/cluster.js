import Redis from 'ioredis'

describe('cluster', () => {
  it('can create instance', () => {
    const cluster = new Redis.Cluster(['redis://localhost:6379'])
    expect(cluster.connected).toEqual(true)
    return expect(cluster instanceof Redis.Cluster).toBeTruthy()
  })

  it('can return correct number of nodes', () => {
    const nodes = ['redis://localhost:7001', 'redis://localhost:7002']
    const cluster = new Redis.Cluster(nodes)
    expect(cluster.connected).toEqual(true)
    expect(cluster.nodes.length).toEqual(nodes.length)
    expect(
      cluster.nodes.every(node => {
        return node instanceof Redis
      })
    ).toBeTruthy()
  })

  it('can set and get', () => {
    const cluster = new Redis.Cluster([''])
    expect(cluster.connected).toEqual(true)
    return cluster
      .set('k', 'v')
      .then(() => {
        return cluster.get('k')
      })
      .then(v => {
        return expect(v).toEqual('v')
      })
  })

  it('can pass redis options to redis mock', () => {
    const nodes = [{ host: 'localhost', port: 7001 }]
    const options = { redisOptions: { lazyConnect: true } }
    const cluster = new Redis.Cluster(nodes, options)
    expect(cluster.connected).toEqual(false)
  })
})
