export function nextTickShim(fn) {
  Promise.resolve().then(() => {fn()})
}