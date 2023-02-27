import path from 'path';
import fs from 'fs';
import DiskCache from "./DiskCache";
import Workdays from "./Workdays";

import generate from './lib/generate.js';
import ConfigInterface from 'interfaces/ConfigInterface';
import IOBase from 'IOBase';

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

    this.cache.write(ref, generate(config));
    this.workdays.flush(ref);
  }
};

export default Config;