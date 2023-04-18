import { easter } from 'date-easter';
import { DateTime } from 'luxon';

import nl from './zones/nl';
import be from './zones/be';

import ZoneNotFoundError from '../errors/ZoneNotFoundError';

const getHolidays = (year: number, zone: string, excludeHolidays: string[]): string[] => {
  const easterDate = DateTime.fromISO(easter(year).toString());

  switch (zone) {
    case 'nl':
      return nl(year, excludeHolidays, easterDate);
    case 'be':
      return be(year, excludeHolidays, easterDate);
    default:
      throw new ZoneNotFoundError(`Zone ${zone} does not exist`);
  }
};

export default getHolidays;
