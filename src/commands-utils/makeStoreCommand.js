export function makeStoreCommand(baseCommand, ResultType) {
  return function (dest, ...args) {
    const result = baseCommand.call(this, ...args);
    this.data.set(dest, new ResultType(result));
    return result.length;
  };
}

export function makeStoreSetCommand(baseCommand) {
  return makeStoreCommand(baseCommand, Set);
}

// @TODO: Bring this into zdiffstore, zinterstore, zrangestore, zunionstore
// export function makeStoreZSetCommand(baseCommand) {
//   return makeStoreCommand(baseCommand, Map);
// }
