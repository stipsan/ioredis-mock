const nodeMajorVersion = +process.versions.node.match(/^\d+/);

export default function createBuffer(data) {
  return nodeMajorVersion >= 6 ? Buffer.from(data) : new Buffer(data);
}
