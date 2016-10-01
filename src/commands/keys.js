import minimatch from 'minimatch';

export function keys(globString) {
  return this.data.keys().filter(key => minimatch(key, globString));
}
