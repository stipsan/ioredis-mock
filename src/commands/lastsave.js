export function lastsave() {
  return Math.floor(new Date().getTime() / 1000)
}

export const lastsaveBuffer = lastsave
