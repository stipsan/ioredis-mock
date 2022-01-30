export function failover() {
  throw new Error('ERR FAILOVER requires connected replicas.')
}

export function failoverBuffer(...args) {
  const val = failover.apply(this, args)
  return val ? Buffer.from(val) : val
}
