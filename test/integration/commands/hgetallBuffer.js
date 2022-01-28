import Redis from 'ioredis'

describe('hgetallBuffer', () => {
  it('should return all the keys and values in a hash map as buffer', () => {
    const emails = {
      'clark@daily.planet': '1',
      'bruce@wayne.enterprises': '2',
    }
    const expected = {
      'clark@daily.planet': Buffer.from('1'),
      'bruce@wayne.enterprises': Buffer.from('2'),
    }
    const redis = new Redis({
      data: {
        emails,
      },
    })

    return redis.hgetallBuffer('emails').then(result => {
      Object.keys(result).forEach(key => {
        expect(Buffer.isBuffer(result[key])).toBeTruthy()
      })
      expect(result).toEqual(expected)
    })
  })

  it('should return an empty object if the hash does not exist', () => {
    const redis = new Redis()
    return redis.hgetallBuffer('emails').then(result => {
      return expect(result).toEqual({})
    })
  })
})
