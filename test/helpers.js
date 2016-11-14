import expect from 'expect';

const expectMethods = [
    'toBe',
    'toBeA',
    'toBeA',
    'toBeAn',
    'toBeAn',
    'toBeGreaterThan',
    'toBeLessThan',
    'toContain',
    'toEqual',
    'toExist',
    'toHaveBeenCalled',
    'toHaveBeenCalledWith',
    'toInclude',
    'toMatch',
    'toNotBe',
    'toNotBeA',
    'toNotBeA',
    'toNotBeAn',
    'toNotBeAn',
    'toNotContain',
    'toNotEqual',
    'toNotExist',
    'toNotHaveBeenCalled',
    'toNotInclude',
    'toNotMatch',
    'toNotThrow',
    'toThrow',
    'toThrow',
    'toThrow',
    'withArgs',
    'withContext'
]

export function eventuallyExpect(actual) {

  // ghetto check for promise
  if (!actual.then) {
    return expect(actual);
  }

  const methods = [];

  const promise = new Promise((resolve, reject) => {
    actual.then(result => {
      const expectation = expect(result);
      try {
        methods.forEach(method => method(expectation));
        resolve(true);
      } catch(e) {
        reject(e);
      }
    })
  })

  expectMethods
    .forEach(method => {
      promise[method] = (...args) => {
        methods.push(expectation => expectation[method](...args));
        return promise;
      }
    });

  return promise;
}
