let promise = global.Promise

const promiseContainer = {
  get: () => promise,
  set: lib => {
    if (typeof lib !== 'function') {
      throw new Error(`Provided Promise must be a function, got ${lib}`)
    }
    promise = lib
  },
}

export default promiseContainer
