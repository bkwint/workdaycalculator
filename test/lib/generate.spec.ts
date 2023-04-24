import {
  describe, it, expect, jest,
} from '@jest/globals';
import { Settings } from 'luxon';
import generate from '../../src/lib/generate';

jest.mock('../../src/lib/getHolidays', () => () => [
  '2023-01-01',
  '2023-04-09',
  '2023-04-10',
  '2023-04-27',
  '2023-05-18',
  '2023-05-28',
  '2023-05-29',
  '2023-12-25',
  '2023-12-26',
]);

describe('lib/generate', () => {
  it('should generate a list of days', () => {
    Settings.now = () => new Date(2023, 0, 1).valueOf();
    const result = generate({
      workdays: [1, 2, 3, 4, 5],
      excludeHolidays: [],
      exclude: [],
      zone: 'nl',
      numberOfYears: 0,
    });

    // 52 whole week in 2023 => 5 days * 50 = 260 days
    // 6 holidays on weekdays, so 260 - 6 = 254
    expect(result.days.length).toBe(254);
  });
});
