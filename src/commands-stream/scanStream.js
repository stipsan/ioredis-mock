import ReadableStream from '../commands-utils/readable-scan'

export function scanStream(opt) {
  return new ReadableStream(this.scan, opt)
}
