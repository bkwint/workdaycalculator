import fs from 'fs';
import path from 'path';
import CacheInterface from './interfaces/CacheInterface.js';
import IOBase from './IOBase.js';

class DiskCache extends IOBase {
  constructor(baseDir: string = './.cache') {
    super(baseDir);
  }

  public get(ref: string): CacheInterface {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    const json = JSON.parse(fs.readFileSync(jsonPath).toString());

    return json;
  }

  public write(ref: string, body: CacheInterface): void {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    return fs.writeFileSync(jsonPath, JSON.stringify(body, null, 2));
  }
}

export default DiskCache;
