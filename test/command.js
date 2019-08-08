import expect, { createSpy } from 'expect';

import createBuffer from '../src/buffer';
import command from '../src/command';

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

  it('should convert non-buffer arguments to strings', () => {
    const args = [createBuffer('foo'), 'bar', 1, null, undefined];
    return stub(...args).then(reply =>
      expect(reply).toEqual([createBuffer('foo'), 'bar', '1', '', ''])
    );
  });

  it('should flatten args', () => {
    const args = [['foo', 'bar', 'baz']];
    return stub(...args).then(reply =>
      expect(reply).toEqual(['foo', 'bar', 'baz'])
    );
  });

  it(
    'should reject the promise if the first argument is bool false to allow simulating failures'
  );
});
