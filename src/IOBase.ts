import path from 'path';

class IOBase {
  protected baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = path.resolve(baseDir);
  }

  protected assertValidPath(pathToCheck: string) {
    if (pathToCheck.length < this.baseDir.length) {
      throw Error('Invalid data requested');
    }

    if (pathToCheck.substring(0, this.baseDir.length) !== this.baseDir) {
      throw Error('Invalid data requested');
    }
  }
}

export default IOBase;
