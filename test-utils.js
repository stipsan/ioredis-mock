// Runs both a regular string suite and a buffer suite
export function runTwinSuite(commandName, cb) {
  const commands = [commandName, `${commandName}Buffer`]
  // const commands = [commandName]

  return commands.forEach(command =>
    command === commandName
      ? cb(command, (a, b) => a === b)
      : cb(command, (a, b) => {
          if (Buffer.isBuffer(a)) return a.equals(Buffer.from(b))

          console.warn('a was expected to be a Buffer:', typeof a, { a, b })
          return a === b
        })
  )
}
