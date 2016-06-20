import microtime from 'microtime';

export function time() {
  return microtime.nowStruct();
}
