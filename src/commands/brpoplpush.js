export function brpoplpush(source, destination) {
  return this.rpoplpush(source, destination)
}

export async function brpoplpushBuffer(source, destination) {
  const val = await brpoplpush.call(this, source, destination)
  return val ? Buffer.from(val) : val
}
