import { coerce } from 'semver'

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

// schotter, plotter on paper, by Georg Nees
async function version5(redisVersion) {
  // Using lolwut version 5 20 10
  return `⢰⠒⢲⠒⢲⠒⣶⠒⡖⢲⡖⢲⠒⣶⠒⡖⠒⡖⠒⡆
  ⢸⠒⢺⠒⢺⠒⣿⠒⡗⢺⡗⢺⠒⣿⠒⡗⠒⡗⠒⡇
  ⡞⠒⣾⣛⣻⣛⣿⢻⡟⢻⠛⣿⢻⡟⢻⠓⢲⣗⣒⡇
  ⣻⠿⣿⣉⣯⣹⣏⣹⣯⣹⣏⣹⣉⣿⢹⣟⣻⣓⣺⠃
  ⣌⣉⣿⠭⣧⣸⣏⣹⣯⣯⣯⣯⣽⣯⣿⣉⣹⣄⣸⠀
  ⣯⣁⣿⣭⣽⣼⣼⡼⣿⣬⣇⣹⡮⣿⣻⣗⣽⣒⡼⡅
  ⢗⣉⢿⣦⣿⣿⣧⢷⣷⣯⣧⣟⣷⣾⣼⣗⣿⢗⣹⢇
  ⢳⠞⢺⠶⣿⠾⣟⣻⣾⠟⢷⣟⢾⢷⣿⣓⢧⡧⠴⡎
  ⡼⠶⡞⢒⡾⠾⡝⢲⡷⡽⢾⣿⢼⣾⢿⠒⣾⡿⠶⡧
  ⢷⠶⣷⣺⢷⣹⢟⣲⢫⠷⡯⢿⢽⢿⢾⡟⢺⢳⢲⠁
  ⡸⠺⡺⣺⡻⢾⠞⢛⢶⡻⢞⠾⣹⢿⣾⠙⣻⠛⠺⡀
  ⠈⠢⠊⠚⠒⠚⠑⠔⠑⠜⠣⠛⠼⠥⠼⠉⠋⠢⠊⠀
  
  Georg Nees - schotter, plotter on paper, 1968. Redis ver. ${redisVersion}`
}

// Plaguemon by hikimori
function version6(redisVersion) {
  // Using lolwut version 6 20 10
  return `[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m
[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m
[0;97;107m [0m[0;97;107m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m[0;97;107m [0m
[0;97;107m [0m[0;97;107m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;97;107m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m
[0;97;107m [0m[0;97;107m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m
[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;37;47m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m
[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;37;47m [0m[0;37;47m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;30;40m [0m[0;30;40m [0m
[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;37;47m [0m[0;37;47m [0m[0;30;40m [0m[0;30;40m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;37;47m [0m[0;37;47m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;30;40m [0m[0;30;40m [0m
[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;37;47m [0m[0;37;47m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;30;40m [0m[0;30;40m [0m
[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;30;40m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;37;47m [0m[0;37;47m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;90;100m [0m[0;30;40m [0m[0;30;40m [0m
Dedicated to the 8 bit game developers of past and present.
Original 8 bit image from Plaguemon by hikikomori. Redis ver. ${redisVersion}`
}

function version7(redisVersion) {
  return `Redis ver. ${redisVersion}`
}

function version8() {
  return ` TRYING   TO GRASP 
 THE BLINDING   GLOBE   OF FIRE 
 THEY ALL RETURN   TO   THEIR ROOTS 
 WHEN IT REACHES   THE STRATOSPHERE 
 THE HAIR   BETWEEN THE LIPS 
 IT EXPANDS   RAPIDLY 
 THEY LAY   MOTIONLESS   WITHOUT SPEAKING 
 ASSUMES   THE WELL-KNOWN SHAPE   OF A MUSHROOM 
 TILL HE MOVED   HIS FINGERS   SLOWLY 
 THE SUMMIT   OF THE CLOUD 

In 1961, Nanni Balestrini created one of the first computer-generated poems, TAPE MARK I, using an IBM 7090 mainframe. Each execution combined verses from three literary sources following algorithmic rules based on metrical compatibility and group constraints. This LOLWUT command reproduces Balestrini's original algorithm, generating new stanzas through the same computational poetry process described in Almanacco Letterario Bompiani, 1962.

https://en.wikipedia.org/wiki/Digital_poetry
https://www.youtube.com/watch?v=8i7uFCK7G0o (English subs)

Use: LOLWUT IT for the original Italian output.`
}

// eslint-disable-next-line default-param-last
export async function lolwut(VERSION = 'VERSION', version) {
  const json = await import('../../data/info.json')
  const data = json.default || json
  const redisRawVersion = data
    .split('\n')
    .find(line => line.indexOf('redis_version') !== -1)
  const redisVersion = coerce(redisRawVersion).version

  if (VERSION && VERSION.toUpperCase() !== 'VERSION') {
    throw new Error('ERR value is not an integer or out of range')
  }

  // eslint-disable-next-line eqeqeq
  if (version == 7) {
    return version7(redisVersion)
  }

  // eslint-disable-next-line eqeqeq
  if (version == 6) {
    return version6(redisVersion)
  }

  // eslint-disable-next-line eqeqeq
  if (version == 5) {
    return version5(redisVersion)
  }

  return version8()
}

export async function lolwutBuffer(...args) {
  const val = await lolwut.apply(this, args)
  return convertStringToBuffer(val)
}
