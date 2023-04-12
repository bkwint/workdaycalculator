import fs from 'fs';
import CacheInterface from './interfaces/CacheInterface.js';
import IOBase from './IOBase.js';
import path from 'path';
import ConfigInterface from 'interfaces/ConfigInterface.js';

class DiskCache extends IOBase {
  constructor(baseDir: string = './.cache') {
    super(baseDir);
  }

  public get(ref: string): CacheInterface {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    const json = JSON.parse(fs.readFileSync(jsonPath).toString());

    return json.cache;
  }

  public getConfig(ref: string): ConfigInterface {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    const json = JSON.parse(fs.readFileSync(jsonPath).toString());

    return json.config;
  }

  public write(ref: string, body: CacheInterface, config: ConfigInterface): void {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    return fs.writeFileSync(jsonPath, JSON.stringify({
      config,
      cache: body
    }, null, 2));
  }
}

export default DiskCache;