export function time() {
  return [
    `${Math.round(new Date().getTime() / 1000)}`,
    `${Math.round(process.hrtime()[1] / 1000)}`,
  ]
}
