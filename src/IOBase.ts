import path from 'path';

class IOBase {
  protected baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = path.resolve(baseDir);
  }

  protected assertValidPath(path: string) {
    if (path.length < this.baseDir.length) {
        throw Error('Invalid data requested');
    }

    if (path.substring(0, this.baseDir.length) !== this.baseDir) {
        throw Error('Invalid data requested');
    }
  }
}

export default IOBase;