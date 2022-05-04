// Runs both a regular string suite and a buffer suite
export function runTwinSuite(commandName, cb) {
  const commands = [`${commandName}Buffer`, commandName]

  return commands.forEach(command =>
    command === commandName
      ? cb(command, (a, b) => a === b)
      : cb(
          command,
          (a, b) => a.equals(Buffer.from(b))
          /*
          // @TODO: detect when it happens so we can remove this
          if (Buffer.isBuffer(a)) return a.equals(Buffer.from(b))

          console.warn('a was expected to be a Buffer:', typeof a, { a, b })
          return a === b
          // */
        )
  )
}

// Util for calling describe.skip if the suite asserts Buffer outputs, which will fail in test:browser.js due to the polyfill
export const browserSafeDescribe = command =>
  process.env.IS_BROWSER && command.endsWith('Buffer')
    ? // eslint-disable-next-line no-undef
      describe.skip
    : // eslint-disable-next-line no-undef
      describe
