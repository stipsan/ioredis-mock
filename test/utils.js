import expect from 'expect';
import {
  bufsToString,
  nonBufsToString,
  stringsToBuf
} from '../src/utils';


describe('bufsToString', () => {
  it('only replaces a buffer with a string', () => {
    const inputs = [1, null, 'foo', Buffer.from('bar')];
    const expected = [1, null, 'foo', 'bar'];

    inputs.forEach((input, idx) =>
      expect(bufsToString(input)).toEqual(expected[idx])
    );
  });

  it('only replaces buffers in an array with strings', () => {
    const input = [1, null, 'foo', Buffer.from('bar')];
    const expected = [1, null, 'foo', 'bar'];

    expect(bufsToString(input)).toEqual(expected);
  });
});

describe('nonBufsToString', () => {
  it('replaces all non-null, non-buffers in an array with strings', () => {
    const input = [1, null, 'foo', Buffer.from('bar'), () => {}];
    const expected = ['1', null, 'foo', Buffer.from('bar'), 'function () {}'];

    expect(nonBufsToString(input)).toEqual(expected);
  });
});

describe('stringsToBuf', () => {
  it('only replaces a string with a buffer', () => {
    const inputs = [1, null, 'foo', Buffer.from('bar')];
    const expected = [1, null, Buffer.from('foo'), Buffer.from('bar')];

    inputs.forEach((input, idx) =>
      expect(stringsToBuf(input)).toEqual(expected[idx])
    );
  });

  it('only replaces strings in an array with buffers', () => {
    const input = [1, null, 'foo', Buffer.from('bar')];
    const expected = [1, null, Buffer.from('foo'), Buffer.from('bar')];

    expect(stringsToBuf(input)).toEqual(expected);
  });
});
