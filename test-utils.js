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

// Don't run snapshot tests in browser.js as the Buffer polyfill isn't compatible with the serializer
export const toMatchSnapshot = process.env.IS_BROWSER
  ? 'toBeTruthy'
  : 'toMatchSnapshot'
