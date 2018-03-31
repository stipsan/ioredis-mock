import semver from 'semver';
import expect, { createSpy } from 'expect';

import command from '../src/command';

const shouldSkip = semver.lt(process.versions.node, '5.10.0');

describe('basic command', () => {
  const stub = command((...args) => args, 'testCommandName', {
    Command: { transformers: { argument: {}, reply: {} } },
  });
  it('should return a Promise that resolves the returned value', () =>
    stub('OK').then(reply => expect(reply).toEqual(['OK'])));

  it('should support node style callbacks', () => {
    const spy = createSpy();
    return stub(spy).then(() => expect(spy).toHaveBeenCalled());
  });

  it('should convert non-buffer, non-null arguments to strings', function() {
    if (shouldSkip) {
      this.skip();
    }
    const args = [Buffer.from('foo'), 'bar', 1, null];
    return stub(...args).then(reply =>
      expect(reply).toEqual([Buffer.from('foo'), 'bar', '1', null])
    );
  });

  it(
    'should reject the promise if the first argument is bool false to allow simulating failures'
  );
});
