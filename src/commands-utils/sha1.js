import crypto from 'crypto'

export default function sha1(inputString) {
  const shasum = crypto.createHash('sha1')
  shasum.update(inputString)
  return shasum.digest('hex')
}
