import expect, { createSpy } from 'expect';

import command from '../src/command';

describe('basic command', () => {
 const stub = command(() => 'OK');
 it('should return a Promise that resolves the returned value', () =>
    stub().then(reply => expect(reply).toBe('OK'))
  );

 it('should support node style callbacks', () => {
   const spy = createSpy();
   return stub(spy).then(() => expect(spy).toHaveBeenCalled());
 });

 it('should reject the promise if the first argument is bool false to allow simulating failures');
});
