export function cluster(...args) {
  if (args.length === 0) {
    throw new Error("ERR wrong number of arguments for 'cluster' command")
  }

  throw new Error('ERR This instance has cluster support disabled')
}

export function clusterBuffer(...args) {
  const val = cluster.apply(this, args)
  return val ? Buffer.from(val) : val
}
