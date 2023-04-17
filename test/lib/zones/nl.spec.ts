import { describe, expect, test } from '@jest/globals';
import { DateTime } from 'luxon';
import { easter } from 'date-easter';
import nl from '../../../src/lib/zones/nl';

const expectedDates = [
  {
    year: 2021,
    expected: [
      '2021-01-01',
      '2021-04-04',
      '2021-04-05',
      '2021-04-27',
      '2021-05-13',
      '2021-05-23',
      '2021-05-24',
      '2021-12-25',
      '2021-12-26',
    ],
  },
  {
    year: 2022,
    expected: [
      '2022-01-01',
      '2022-04-17',
      '2022-04-18',
      '2022-04-27',
      '2022-05-26',
      '2022-06-05',
      '2022-06-06',
      '2022-12-25',
      '2022-12-26',
    ],
  },
  {
    year: 2023,
    expected: [
      '2023-01-01',
      '2023-04-09',
      '2023-04-10',
      '2023-04-27',
      '2023-05-18',
      '2023-05-28',
      '2023-05-29',
      '2023-12-25',
      '2023-12-26',
    ],
  },
  {
    year: 2024,
    expected: [
      '2024-01-01',
      '2024-03-31',
      '2024-04-01',
      '2024-04-27',
      '2024-05-09',
      '2024-05-19',
      '2024-05-20',
      '2024-12-25',
      '2024-12-26',
    ],
  },
  {
    year: 2025,
    expected: [
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
    ],
  },
];

describe('lib/zones/nl.ts', () => {
  test.each(expectedDates)('year $year should be returned correctly', ({ year, expected }) => {
    const easterDate = DateTime.fromISO(easter(year).toString());
    const result = nl(year, [], easterDate);
    expect(result).toEqual(expected);
  });

  test.each(expectedDates)('year $year should be returned correctly if 01-01 and 12-26 are excluded', ({ year, expected }) => {
    const easterDate = DateTime.fromISO(easter(year).toString());
    const result = nl(year, ['nieuwjaar', 'tweede kerstdag'], easterDate);
    expect(result).toEqual(expected.filter((date) => !date.includes('01-01') && !date.includes('12-26')));
  });
});
