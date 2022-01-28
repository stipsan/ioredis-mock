import hrtime from 'browser-process-hrtime';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export function nextTickShim(fn) {
  Promise.resolve().then(() => {
    fn();
  });
}

export const hrtimeShim = hrtime;
