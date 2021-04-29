import patternMatchesString from '../commands-utils/patternMatchesString';

export function keys(globString) {
  return this.data
    .keys()
    .filter((key) => patternMatchesString(globString, key));
}
