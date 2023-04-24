import { DateTime } from 'luxon';
// eslint-disable-next-line import/extensions
import flattenDeep from 'lodash/flattenDeep.js';

import ConfigInterface from 'interfaces/ConfigInterface.js';
import CacheInterface from 'interfaces/CacheInterface.js';

import getHolidays from './getHolidays.js';

const generate = (config: ConfigInterface): CacheInterface => {
  let now = DateTime.now().startOf('day');
  const endDate = DateTime.fromISO(`${DateTime.now().year + config.numberOfYears}-12-31`);

  const workdays: CacheInterface = {
    dayToIndex: {},
    days: [],
  };

  // generate the holidays for every year in the range
  const startYear = DateTime.now().year;
  const endYear = endDate.year;
  const holidaysPerYear = [];
  for (let i = startYear; i <= endYear; i += 1) {
    holidaysPerYear.push(getHolidays(i, config.zone, config.excludeHolidays));
  }

  const holidays = flattenDeep(holidaysPerYear);

  let i = 0;
  while (now <= endDate) {
    workdays.dayToIndex[now.toISODate()] = i;

    // determin the day and the string representation of the date
    if (
      !holidays.includes(now.toISODate()) // if is no holiday
      && config.workdays.includes(now.weekday) // and it is a workday of the week
      && !config.exclude.includes(now.toISODate()) // and it is not a special excluded day
    ) {
      workdays.days.push(now.toISODate());
      i += 1;
    }

    now = now.plus({ days: 1 });
  }

  return workdays;
};

export default generate;
