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

export function eventuallyExpect (actual) {

  function wrapMethod(method) {
    return (...args) => actual.then(result => expect(result)[method](...args));
  }

  // ghetto check for promise
  if (!actual.then) {
    return expect(actual);
  }

  return expectMethods
    .reduce(
      (obj, method) => Object.assign(obj, { [method]: wrapMethod(method) }),
      {}
    );
}
