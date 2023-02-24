const fs = require('fs');
const path = require('path');

class Cache {
  constructor(baseDir = './.cache') {
    this.baseDir = path.resolve(baseDir);
  }

  get(ref) {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    const json = JSON.parse(fs.readFileSync(jsonPath).toString());

    return json;
  }

  write(ref, body) {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    return fs.writeFileSync(jsonPath, JSON.stringify(body, null, 2));
  }

  assertValidPath(path) {
    if (path.length < this.baseDir.length) {
        throw Error('Invalid data requested');
    }

    if (path.substr(0, this.baseDir.length) !== this.baseDir) {
        throw Error('Invalid data requested');
    }
  }
}

module.exports = Cache;