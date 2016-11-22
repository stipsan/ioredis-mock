import expect, { createSpy } from 'expect';
import { createCommand, createBufferCommand } from '../src/command';

const sharedTests = stub => () => {
  it('should return a Promise', () =>
    expect(stub('OK').then).toExist()
  );

  it('should support node style callbacks', () => {
    const spy = createSpy();
    return stub(spy).then(() => expect(spy).toHaveBeenCalled());
  });

  it('should reject the promise if the first argument is bool false to allow simulating failures');
};

describe('basic command', () => {
  const stub = createCommand((...args) => args);

  describe('shared', sharedTests(stub));

  it('should return strings for all', () => {
    const args = [Buffer.from('foo'), 'bar', 1];
    const expected = ['foo', 'bar', '1'];
    return stub(...args).then(reply => expect(reply).toEqual(expected));
  });
});

describe('buffer command', () => {
  const stub = createBufferCommand((...args) => args);

  describe('shared', sharedTests(stub));

  it('should return buffers for strings and strings for other', () => {
    const args = [Buffer.from('foo'), 'bar', 1]; // the 1 is stringified on the way in.
    const expected = [Buffer.from('foo'), Buffer.from('bar'), Buffer.from('1')];
    return stub(...args).then(reply => expect(reply).toEqual(expected));
  });
});
