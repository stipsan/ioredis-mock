import Redis from 'ioredis'

describe('cluster', () => {
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('can create instance', () => {
    const cluster = new Redis.Cluster(['redis://localhost:6379'])
    expect(cluster.connected).toEqual(true)
    return expect(cluster instanceof Redis.Cluster).toBeTruthy()
  })
  ;(process.env.IS_E2E ? it.skip : it)(
    'can return correct number of nodes',
    () => {
      const nodes = ['redis://localhost:7001', 'redis://localhost:7002']
      const cluster = new Redis.Cluster(nodes)
      expect(cluster.connected).toEqual(true)
      expect(cluster.nodes().length).toEqual(nodes.length)
      expect(cluster.nodes().every(node => node instanceof Redis)).toBeTruthy()
    }
  )
  ;(process.env.IS_E2E ? it.skip : it)('can set and get', () => {
    const cluster = new Redis.Cluster([''])
    expect(cluster.connected).toEqual(true)
    return cluster
      .set('k', 'v')
      .then(() => cluster.get('k'))
      .then(v => expect(v).toEqual('v'))
  })
  ;(process.env.IS_E2E ? it.skip : it)(
    'can pass redis options to redis mock',
    () => {
      const nodes = [{ host: 'localhost', port: 7001 }]
      const options = { redisOptions: { lazyConnect: true } }
      const cluster = new Redis.Cluster(nodes, options)
      expect(cluster.connected).toEqual(false)
    }
  )
})
