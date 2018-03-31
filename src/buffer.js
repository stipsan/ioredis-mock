const nodeMajorVersion = +process.versions.node.match(/^\d+/);

export default function createBuffer(data) {
  // eslint-disable-next-line no-buffer-constructor
  return nodeMajorVersion >= 6 ? Buffer.from(data) : new Buffer(data);
}
