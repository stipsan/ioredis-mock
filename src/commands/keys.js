import minimatch from 'minimatch';

export function keys(globString) {
  return Object.keys(this.data).filter((key) => minimatch(key, globString));
}
