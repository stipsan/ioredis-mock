import semver from 'semver';
import expect, { createSpy } from 'expect';

import command from '../src/command';

const shouldSkip = semver.lt(process.versions.node, '0.11.0');

describe('basic command', () => {
  const stub = command((...args) => args);
  it('should return a Promise that resolves the returned value', () =>
    stub('OK').then(reply => expect(reply).toEqual(['OK']))
  );

  it('should support node style callbacks', () => {
    const spy = createSpy();
    return stub(spy).then(() => expect(spy).toHaveBeenCalled());
  });

  it('should convert non-buffer arguments to strings', function () {
    if (shouldSkip) {
      this.skip();
    }
    const args = [new Buffer('foo'), 'bar', 1];
    return stub(...args).then(reply => expect(reply).toEqual([new Buffer('foo'), 'bar', '1']));
  });

  it('should reject the promise if the first argument is bool false to allow simulating failures');
});
