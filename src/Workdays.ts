import { DateTime } from 'luxon';
import DiskCache from './DiskCache.js';

class Workdays {
  private configs:any;

  private cache: DiskCache;

  constructor(cache: DiskCache) {
    this.configs = [];
    this.cache = cache;
  }

  /**
   * Generates a key that can be used throughout the workdays object for referencing
   * the correct bit of memory
   *
   * @param ref string
   * @returns
   */
  private getKey(ref:string): string {
    return `ref_${ref}`;
  }

  /**
   * Lazyloading the data for the given reference such that we
   * do not consume more memory than is strictly required
   *
   * @param ref string
   */
  private lazyLoadConfig(ref: string): void {
    if (!this?.configs[this.getKey(ref)]) {
      this.configs[this.getKey(ref)] = this.cache.get(ref);
    }
  }

  /**
   * Tells if a givne date is a workday
   *
   * @param ref string
   * @param date Date
   * @returns boolean
   */
  public isWorkday(ref: string, date: Date): boolean {
    this.lazyLoadConfig(ref);

    const dt = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
    // get the index
    const index = this.configs[this.getKey(ref)].dayToIndex[dt];

    return this.configs[this.getKey(ref)].days[index] === dt;
  }

  /**
   * Fetches the workday after the given date which is workdaysToAdd workdays
   * in the future
   *
   * @param ref string
   * @param date Date
   * @param workdaysToAdd number
   * @returns string
   */
  public getWorkday(ref: string, date: Date, workdaysToAdd: number): string {
    this.lazyLoadConfig(ref);

    // get the index
    const index = this.configs[this.getKey(ref)].dayToIndex[DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')];

    return this.configs[this.getKey(ref)].days[index + workdaysToAdd - 1];
  }

  /**
   * Flushes the workdays currently in memory such that we can lay load them again from the
   * disk cache
   *
   * @param ref string
   */
  public flush(ref: string) {
    delete this.configs[this.getKey(ref)];
  }
}

export default Workdays;
