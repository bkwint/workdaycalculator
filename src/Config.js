const path = require('path');
const fs = require('fs');
const generate = require('./lib/generate');

class Config {
  constructor(cache, workdays, baseDir = './.config') {
    this.baseDir = baseDir;
    this.workdays = workdays;
    this.cache = cache;
  }

  get(ref) {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);
    
    return JSON.parse(fs.readFileSync(jsonPath).toString());
  }

  write(ref, config) {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2));

    this.cache.write(ref, generate(config, ref));
    this.workdays.flush(ref);
  }

  assertValidPath(path) {
    if (path.length < this.baseDir.length) {
        throw Error('Invalid data requested');
    }

    if (path.substr(0, this.baseDir.length) !== this.baseDir) {
        throw Error('Invalid data requested');
    }
  }
};

module.exports = Config;