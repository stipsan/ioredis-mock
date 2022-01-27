import { Buffer } from 'buffer';

global.Buffer = Buffer;

export function nextTickShim(fn) {
  Promise.resolve().then(() => {
    fn();
  });
}
