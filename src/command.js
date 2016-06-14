export default function command(emulate) {
  return (...args) => new Promise(resolve => resolve(emulate(...args)));
}
