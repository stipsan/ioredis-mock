// Runs both a regular string suite and a buffer suite
export function runTwinSuite(commandName, cb) {
  const commands = [commandName, `${commandName}Buffer`]

  return commands.forEach(command =>
    command === commandName
      ? cb(
          command,
          (a, b) => a === b,
          c => c
        )
      : cb(
          command,
          (a, b) => a.equals(b),
          c => Buffer.from(c)
        )
  )
}
