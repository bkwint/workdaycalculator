import path from 'path';
import fs from 'fs';
import DiskCache from './DiskCache.js';
import Workdays from './Workdays.js';

import generate from './lib/generate.js';
import ConfigInterface from './interfaces/ConfigInterface.js';
import IOBase from './IOBase.js';

class Config extends IOBase {
  private workdays: Workdays;
  private cache: DiskCache;

  constructor(cache: DiskCache, workdays: Workdays, baseDir = './.config') {
    super(baseDir);
    this.workdays = workdays;
    this.cache = cache;
  }

  public get(ref: string): ConfigInterface {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    return JSON.parse(fs.readFileSync(jsonPath).toString());
  }

  public write(ref: string, config: ConfigInterface): void {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2));

    this.cache.write(ref, generate(config), config);
    this.workdays.flush(ref);
  }

  public regenerateCache(): boolean {
    // we need to read all the files in the cache dir and regenerate
    // everything
    try {
      const refs = fs.readdirSync(path.resolve(this.baseDir))
        .filter((item) => item.substring(item.length - 5, item.length) === '.json')
        .map((item) => item.substring(0, item.length - 5));

      for (const ref of refs) {
        const currentConfig = this.get(ref);

        // try to get the old configuration to make a compare
        let oldConfig = {};
        try {
          oldConfig = this.cache.getConfig(ref);
        } catch (e) {}

        // if there is a difference, we do a rollover of the cache
        if (JSON.stringify(currentConfig) !== JSON.stringify(oldConfig)) {
          this.write(ref, this.get(ref));
        }
      }
    } catch (e) {
      return false;
    }

    return true;
  }
};

export default Config;
