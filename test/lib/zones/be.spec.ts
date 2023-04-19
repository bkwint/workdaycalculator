import { describe, expect, test } from '@jest/globals';
import { DateTime } from 'luxon';
import { easter } from 'date-easter';
import be from '../../../src/lib/zones/be';

const expectedDates = [
  {
    year: 2021,
    expected: [
      '2021-01-01',
      '2021-04-05',
      '2021-05-01',
      '2021-05-13',
      '2021-05-24',
      '2021-07-21',
      '2021-08-15',
      '2021-11-01',
      '2021-11-11',
      '2021-12-25',
    ],
  },
  {
    year: 2022,
    expected: [
      '2022-01-01',
      '2022-04-18',
      '2022-05-01',
      '2022-05-26',
      '2022-06-06',
      '2022-07-21',
      '2022-08-15',
      '2022-11-01',
      '2022-11-11',
      '2022-12-25',
    ],
  },
  {
    year: 2023,
    expected: [
      '2023-01-01',
      '2023-04-10',
      '2023-05-01',
      '2023-05-18',
      '2023-05-29',
      '2023-07-21',
      '2023-08-15',
      '2023-11-01',
      '2023-11-11',
      '2023-12-25',
    ],
  },
  {
    year: 2024,
    expected: [
      '2024-01-01',
      '2024-04-01',
      '2024-05-01',
      '2024-05-09',
      '2024-05-20',
      '2024-07-21',
      '2024-08-15',
      '2024-11-01',
      '2024-11-11',
      '2024-12-25',
    ],
  },
  {
    year: 2025,
    expected: [
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
    ],
  },
];

describe('lib/zones/be.ts', () => {
  test.each(expectedDates)('year $year should be returned correctly', ({ year, expected }) => {
    const easterDate = DateTime.fromISO(easter(year).toString());
    const result = be(year, [], easterDate);
    expect(result).toEqual(expected);
  });
});
