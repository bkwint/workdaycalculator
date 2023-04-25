import path from 'path';
import fs from 'fs';
import DiskCache from './DiskCache';
import Workdays from './Workdays';

import generate from './lib/generate';
import ConfigInterface from './interfaces/ConfigInterface';
import IOBase from './IOBase';
import ConfigNotFoundError from './errors/ConfigNotFoundError';

class Config extends IOBase {
  private workdays: Workdays;

  private cache: DiskCache;

  constructor(cache: DiskCache, workdays: Workdays, baseDir = './.config') {
    super(baseDir);
    this.workdays = workdays;
    this.cache = cache;
  }

  public get(ref: string): ConfigInterface {
    try {
      const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

      // make sure we can only read from the given path
      this.assertValidPath(jsonPath);

      return JSON.parse(fs.readFileSync(jsonPath).toString());
    } catch (e) {
      throw new ConfigNotFoundError(`The config for ref ${ref} could not be found`);
    }
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
      fs.readdirSync(path.resolve(this.baseDir))
        .filter((item) => item.substring(item.length - 5, item.length) === '.json')
        .map((item) => item.substring(0, item.length - 5))
        .forEach((ref) => {
          const currentConfig = this.get(ref);

          // try to get the old configuration to make a compare
          let oldConfig = {};
          try {
            oldConfig = this.cache.getConfig(ref);
          } catch (e) {
            // nothing
          }

          // if there is a difference, we do a rollover of the cache
          if (JSON.stringify(currentConfig) !== JSON.stringify(oldConfig)) {
            this.write(ref, this.get(ref));
          }
        });
    } catch (e) {
      return false;
    }

    return true;
  }
}

export default Config;
