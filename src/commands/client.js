let clientIdCounter = 0

const getNextClientId = () => {
  clientIdCounter += 1
  return clientIdCounter
}

const clientHelpText = [
  'CLIENT SETNAME <name>',
  '    Set the current connection name.',
  'CLIENT GETNAME',
  '    Get the current connection name.',
  'CLIENT ID',
  '    Returns the unique ID for the current connection.',
  'CLIENT INFO',
  '    Returns information and statistics about the current client connection.',
  'CLIENT LIST [TYPE <type>]',
  '    Returns information and statistics about the clients connected to the server.',
  'CLIENT PAUSE <timeout> [WRITE|ALL]',
  '    Suspends all the Redis clients for the specified amount of time.',
  'CLIENT UNPAUSE',
  '    Resumes command processing for all clients.',
  'CLIENT SETINFO <attr> <value>',
  '    Sets a performance indicator property of the client.',
  'CLIENT CACHING <YES|NO>',
  '    Specifies whether the client wants to track keys in the next command.',
  'CLIENT TRACKING [ON|OFF] [REDIRECT <id>] [PREFIX <prefix>] [BCAST] [OPTIN] [OPTOUT] [NOLOOP]',
  '    Controls server-assisted client side caching.',
  'CLIENT TRACKINGINFO',
  '    Returns information about server-assisted client side caching.',
  'CLIENT NO-EVICT <ON|OFF>',
  '    Controls client eviction mode.',
  'CLIENT NO-TOUCH <ON|OFF>',
  '    Controls whether commands affect LRU/LFU.',
  'CLIENT HELP',
  '    Shows this help message.',
]

function formatClientInfo(
  id,
  name,
  addr,
  laddr,
  fd,
  db,
  sub,
  psub,
  multi,
  blocking,
  attrs,
  lib
) {
  let info = `id=${id} addr=${addr} laddr=${laddr} fd=${fd} name=${name} db=${db} sub=${sub} psub=${psub} multi=${multi} blocking=${blocking}`
  if (attrs) {
    info += ` attrs=${attrs}`
  }
  if (lib) {
    info += ` lib=${lib}`
  }
  return info
}

export function client(subcommand, ...args) {
  const command = Buffer.isBuffer(subcommand)
    ? subcommand.toString().toUpperCase()
    : subcommand?.toUpperCase()

  if (command === 'SETNAME') {
    const name = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    this._clientName = name
    return 'OK'
  }

  if (command === 'GETNAME') {
    return this._clientName || null
  }

  if (command === 'ID') {
    if (!this._clientId) {
      this._clientId = getNextClientId()
    }
    return this._clientId
  }

  if (command === 'INFO') {
    const id = this._clientId || getNextClientId()
    const name = this._clientName || ''
    return formatClientInfo(
      id,
      name,
      '127.0.0.1:54321',
      '127.0.0.1:6379',
      11,
      0,
      0,
      0,
      0,
      0,
      this._clientAttrs || '',
      this._clientLib || ''
    )
  }

  if (command === 'LIST') {
    const id = this._clientId || getNextClientId()
    const name = this._clientName || ''
    return formatClientInfo(
      id,
      name,
      '127.0.0.1:54321',
      '127.0.0.1:6379',
      11,
      0,
      0,
      0,
      0,
      0,
      this._clientAttrs || '',
      this._clientLib || ''
    )
  }

  if (command === 'PAUSE') {
    const timeout = parseInt(args[0], 10)
    this._clientPauseTimeout = timeout
    return 'OK'
  }

  if (command === 'UNPAUSE') {
    this._clientPauseTimeout = null
    return 'OK'
  }

  if (command === 'SETINFO') {
    const attr = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    const value = Buffer.isBuffer(args[1]) ? args[1].toString() : args[1]
    if (attr === 'LIB-NAME') {
      this._clientLibName = value
    } else if (attr === 'LIB-VER') {
      this._clientLibVer = value
    } else {
      this._clientAttrs = this._clientAttrs || {}
      this._clientAttrs[attr] = value
    }
    updateClientLib(this)
    return 'OK'
  }

  if (command === 'CACHING') {
    const mode = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (mode !== 'YES' && mode !== 'NO') {
      throw new Error('ERR syntax error, use CACHING YES or CACHING NO')
    }
    this._clientCaching = mode
    return 'OK'
  }

  if (command === 'TRACKING') {
    const status = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (status !== 'ON' && status !== 'OFF') {
      throw new Error('ERR syntax error, use TRACKING ON or TRACKING OFF')
    }
    this._clientTracking = status === 'ON'
    return 'OK'
  }

  if (command === 'TRACKINGINFO') {
    const flags = []
    if (!this._clientTracking) {
      flags.push('off')
    } else {
      flags.push('on')
      if (this._clientTrackingBcast) {
        flags.push('bcast')
      }
      if (this._clientTrackingOptin) {
        flags.push('optin')
      }
      if (this._clientTrackingOptout) {
        flags.push('optout')
      }
      if (this._clientTrackingNoloop) {
        flags.push('noloop')
      }
    }
    if (this._clientCaching === 'YES') {
      flags.push('caching-yes')
    } else if (this._clientCaching === 'NO') {
      flags.push('caching-no')
    }
    return [
      'flags',
      flags.join(','),
      'redirect',
      0,
      'prefixes',
      this._clientTrackingPrefixes || [],
    ]
  }

  if (command === 'NO-EVICT') {
    const enabled = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (enabled !== 'ON' && enabled !== 'OFF') {
      throw new Error('ERR syntax error, use NO-EVICT ON or NO-EVICT OFF')
    }
    this._clientNoEvict = enabled === 'ON'
    return 'OK'
  }

  if (command === 'NO-TOUCH') {
    const enabled = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (enabled !== 'ON' && enabled !== 'OFF') {
      throw new Error('ERR syntax error, use NO-TOUCH ON or NO-TOUCH OFF')
    }
    this._clientNoTouch = enabled === 'ON'
    return 'OK'
  }

  if (command === 'HELP') {
    return clientHelpText
  }

  throw new Error(
    `ERR Unknown subcommand or wrong number of arguments for '${subcommand}'. Try CLIENT HELP.`
  )
}

function updateClientLib(self) {
  let lib = ''
  if (self._clientLibName) {
    lib = self._clientLibName
    if (self._clientLibVer) {
      lib += '(' + self._clientLibVer + ')'
    }
  }
  self._clientLib = lib
}

export function clientBuffer(subcommand, ...args) {
  const normalizedSubcommand = Buffer.isBuffer(subcommand)
    ? subcommand.toString()
    : subcommand
  const command = normalizedSubcommand?.toUpperCase()

  if (command === 'SETNAME') {
    const name = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    this._clientName = name
    return Buffer.from('OK')
  }

  if (command === 'GETNAME') {
    if (!this._clientName) {
      return null
    }
    return Buffer.from(this._clientName)
  }

  if (command === 'ID') {
    if (!this._clientId) {
      this._clientId = getNextClientId()
    }
    return this._clientId
  }

  if (command === 'INFO') {
    const id = this._clientId || getNextClientId()
    const name = this._clientName || ''
    return Buffer.from(
      formatClientInfo(
        id,
        name,
        '127.0.0.1:54321',
        '127.0.0.1:6379',
        11,
        0,
        0,
        0,
        0,
        0,
        this._clientAttrs || '',
        this._clientLib || ''
      )
    )
  }

  if (command === 'LIST') {
    const id = this._clientId || getNextClientId()
    const name = this._clientName || ''
    return Buffer.from(
      formatClientInfo(
        id,
        name,
        '127.0.0.1:54321',
        '127.0.0.1:6379',
        11,
        0,
        0,
        0,
        0,
        0,
        this._clientAttrs || '',
        this._clientLib || ''
      )
    )
  }

  if (command === 'PAUSE') {
    const timeout = parseInt(args[0], 10)
    this._clientPauseTimeout = timeout
    return Buffer.from('OK')
  }

  if (command === 'UNPAUSE') {
    this._clientPauseTimeout = null
    return Buffer.from('OK')
  }

  if (command === 'SETINFO') {
    const attr = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    const value = Buffer.isBuffer(args[1]) ? args[1].toString() : args[1]
    if (attr === 'LIB-NAME') {
      this._clientLibName = value
    } else if (attr === 'LIB-VER') {
      this._clientLibVer = value
    } else {
      this._clientAttrs = this._clientAttrs || {}
      this._clientAttrs[attr] = value
    }
    updateClientLib(this)
    return Buffer.from('OK')
  }

  if (command === 'CACHING') {
    const mode = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (mode !== 'YES' && mode !== 'NO') {
      throw new Error('ERR syntax error, use CACHING YES or CACHING NO')
    }
    this._clientCaching = mode
    return Buffer.from('OK')
  }

  if (command === 'TRACKING') {
    const status = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (status !== 'ON' && status !== 'OFF') {
      throw new Error('ERR syntax error, use TRACKING ON or TRACKING OFF')
    }
    this._clientTracking = status === 'ON'
    return Buffer.from('OK')
  }

  if (command === 'TRACKINGINFO') {
    const flags = []
    if (!this._clientTracking) {
      flags.push('off')
    } else {
      flags.push('on')
      if (this._clientTrackingBcast) {
        flags.push('bcast')
      }
      if (this._clientTrackingOptin) {
        flags.push('optin')
      }
      if (this._clientTrackingOptout) {
        flags.push('optout')
      }
      if (this._clientTrackingNoloop) {
        flags.push('noloop')
      }
    }
    if (this._clientCaching === 'YES') {
      flags.push('caching-yes')
    } else if (this._clientCaching === 'NO') {
      flags.push('caching-no')
    }
    return [
      Buffer.from('flags'),
      Buffer.from(flags.join(',')),
      Buffer.from('redirect'),
      Buffer.from('0'),
      Buffer.from('prefixes'),
      this._clientTrackingPrefixes || [],
    ]
  }

  if (command === 'NO-EVICT') {
    const enabled = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (enabled !== 'ON' && enabled !== 'OFF') {
      throw new Error('ERR syntax error, use NO-EVICT ON or NO-EVICT OFF')
    }
    this._clientNoEvict = enabled === 'ON'
    return Buffer.from('OK')
  }

  if (command === 'NO-TOUCH') {
    const enabled = Buffer.isBuffer(args[0]) ? args[0].toString() : args[0]
    if (enabled !== 'ON' && enabled !== 'OFF') {
      throw new Error('ERR syntax error, use NO-TOUCH ON or NO-TOUCH OFF')
    }
    this._clientNoTouch = enabled === 'ON'
    return Buffer.from('OK')
  }

  if (command === 'HELP') {
    return clientHelpText.map(s => Buffer.from(s))
  }

  throw new Error(
    `ERR Unknown subcommand or wrong number of arguments for '${normalizedSubcommand}'. Try CLIENT HELP.`
  )
}
