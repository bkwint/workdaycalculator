import { DateTime } from 'luxon';
import flattenDeep from 'lodash/flattenDeep';

import ConfigInterface from 'interfaces/ConfigInterface';
import CacheInterface from 'interfaces/CacheInterface';

import getHolidays from './getHolidays';

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
