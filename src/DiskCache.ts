import fs from 'fs';
import path from 'path';
import ConfigInterface from 'interfaces/ConfigInterface';
import CacheInterface from './interfaces/CacheInterface';
import IOBase from './IOBase';
import CacheNotFoundError from './errors/CacheNotFoundError';
import CacheFileInterface from './interfaces/CacheFileInterface';

class DiskCache extends IOBase {
  constructor(baseDir: string = './.cache') {
    super(baseDir);
  }

  private getCacheFile(ref: string): CacheFileInterface {
    try {
      const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

      // make sure we can only read from the given path
      this.assertValidPath(jsonPath);

      const json = JSON.parse(fs.readFileSync(jsonPath).toString());

      return json;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      throw new CacheNotFoundError(`No cache found for ${ref}`);
    }
  }

  public get(ref: string): CacheInterface {
    const json = this.getCacheFile(ref);

    return json.cache;
  }

  public getConfig(ref: string): ConfigInterface {
    const json = this.getCacheFile(ref);

    return json.config;
  }

  public write(ref: string, body: CacheInterface, config: ConfigInterface): void {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    return fs.writeFileSync(jsonPath, JSON.stringify({
      config,
      cache: body,
    }, null, 2));
  }
}

export default DiskCache;
