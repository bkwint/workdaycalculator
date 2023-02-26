import fs from 'fs';
import path from 'path';

class DiskCache {
  private baseDir: string;

  constructor(baseDir: string = './.cache') {
    this.baseDir = path.resolve(baseDir);
  }

  public get(ref: string): any {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    const json = JSON.parse(fs.readFileSync(jsonPath).toString());

    return json;
  }

  public write(ref: string, body: any): void {
    const jsonPath = path.resolve(this.baseDir, `${ref}.json`);

    // make sure we can only read from the given path
    this.assertValidPath(jsonPath);

    return fs.writeFileSync(jsonPath, JSON.stringify(body, null, 2));
  }

  private assertValidPath(path: string) {
    if (path.length < this.baseDir.length) {
        throw Error('Invalid data requested');
    }

    if (path.substring(0, this.baseDir.length) !== this.baseDir) {
        throw Error('Invalid data requested');
    }
  }
}

export default DiskCache;