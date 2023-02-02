/*
 * Copyright (c) 2009-2012, Salvatore Sanfilippo <antirez at gmail dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   * Neither the name of Redis nor the names of its contributors may be used
 *     to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint-disable no-param-reassign */

// translated from https://github.com/redis/redis/blob/d96f47cf06b1cc24b82109e0e87ac5428517525a/src/util.c

export function stringmatchlen(
  pattern,
  p,
  patternLen,
  string,
  s,
  stringLen,
  nocase
) {
  while (patternLen && stringLen) {
    switch (pattern[p]) {
      case '*':
        while (patternLen && pattern[p + 1] === '*') {
          p++
          patternLen--
        }
        if (patternLen === 1) return true /* match */
        while (stringLen) {
          if (
            stringmatchlen(
              pattern,
              p + 1,
              patternLen - 1,
              string,
              s,
              stringLen,
              nocase
            )
          ) {
            return true /* match */
          }
          s++
          stringLen--
        }
        return false /* no match */
      case '?':
        s++
        stringLen--
        break
      case '[': {
        let match = false

        p++
        patternLen--
        const not = pattern[p] === '^'
        if (not) {
          p++
          patternLen--
        }
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (pattern[p] === '\\' && patternLen >= 2) {
            p++
            patternLen--
            if (pattern[p] === string[s]) match = true
          } else if (pattern[p] === ']') {
            break
          } else if (patternLen === 0) {
            p--
            patternLen++
            break
          } else if (patternLen >= 3 && pattern[p + 1] === '-') {
            let start = pattern[p]
            let end = pattern[p + 2]
            let c = string[s]
            if (start > end) {
              const t = start
              start = end
              end = t
            }
            if (nocase) {
              start = start.toLowerCase()
              end = end.toLowerCase()
              c = c.toLowerCase()
            }
            p += 2
            patternLen -= 2
            if (c >= start && c <= end) {
              match = true
            }
          } else if (!nocase) {
            if (pattern[p] === string[s]) match = true
          } else if (pattern[p].toLowerCase() === string[s].toLowerCase()) {
            match = true
          }
          p++
          patternLen--
        }
        if (not) match = !match
        if (!match) return false /* no match */
        s++
        stringLen--
        break
      }
      case '\\':
        if (patternLen >= 2) {
          p++
          patternLen--
        }
      // eslint-disable-next-line no-fallthrough
      default:
        if (!nocase) {
          if (pattern[p] !== string[s]) return false /* no match */
        } else if (pattern[p].toLowerCase() !== string[s].toLowerCase()) {
          return false /* no match */
        }
        s++
        stringLen--
        break
    }
    p++
    patternLen--
    if (stringLen === 0) {
      while (pattern[p] === '*') {
        p++
        patternLen--
      }
      break
    }
  }
  return patternLen === 0 && stringLen === 0
}

function stringmatch(pattern, string, nocase) {
  return stringmatchlen(
    pattern,
    0,
    pattern.length,
    string,
    0,
    string.length,
    nocase
  )
}

export default function patternMatchesString(pattern, string) {
  return stringmatch(pattern, string, false)
}
