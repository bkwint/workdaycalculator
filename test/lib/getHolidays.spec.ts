import { describe, expect, it } from '@jest/globals';
import getHolidays from '../../src/lib/getHolidays';
import ZoneNotFoundError from '../../src/errors/ZoneNotFoundError';

const dutchDays = [
  '2025-01-01',
  '2025-04-20',
  '2025-04-21',
  '2025-04-27',
  '2025-05-29',
  '2025-06-08',
  '2025-06-09',
  '2025-12-25',
  '2025-12-26',
  '2025-05-05',
];

const belgiumDays = [
  '2025-01-01',
  '2025-04-21',
  '2025-05-01',
  '2025-05-29',
  '2025-06-09',
  '2025-07-21',
  '2025-08-15',
  '2025-11-01',
  '2025-11-11',
  '2025-12-25',
];

describe('lib/getHolidays', () => {
  it('should return dutch days', () => {
    const result = getHolidays(2025, 'nl', []);
    expect(result).toEqual(dutchDays);
  });

  it('should return belgium days', () => {
    const result = getHolidays(2025, 'be', []);
    expect(result).toEqual(belgiumDays);
  });

  it('should throw for invalid zone', () => {
    expect(() => getHolidays(2025, 'abc', [])).toThrowError(new ZoneNotFoundError('Zone abc does not exist'));
  });
});
