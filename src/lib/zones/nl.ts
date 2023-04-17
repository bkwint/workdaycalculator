import { DateTime } from 'luxon';

const nieuwjaar = 'nieuwjaar';
const eerstePaasdag = 'eerste paasdag';
const tweedePaasdag = 'tweede paasdag';
const koningsdag = 'koningsdag';
const hemelvaartsdag = 'hemelvaartsdag';
const eerstePinksterdag = 'eerste pinksterdag';
const tweedePinksterdag = 'tweede pinksterdag';
const eersteKerstdag = 'eerste kerstdag';
const tweedeKerstdag = 'tweede kerstdag';
const bevrijdingsdag = 'bevrijdingsdag';

const zone = (year: number, excludeHolidays: string[], easterDate: DateTime) => {
  const result = [
    !excludeHolidays.includes(nieuwjaar)
      ? `${year}-01-01`
      : undefined,
    !excludeHolidays.includes(eerstePaasdag)
      ? easterDate.toISODate()
      : undefined,
    !excludeHolidays.includes(tweedePaasdag)
      ? easterDate.plus({ days: 1 }).toISODate()
      : undefined,
    !excludeHolidays.includes(koningsdag)
      ? `${year}-04-27`
      : undefined,
    !excludeHolidays.includes(hemelvaartsdag)
      ? easterDate.plus({ days: 39 }).toISODate()
      : undefined,
    !excludeHolidays.includes(eerstePinksterdag)
      ? easterDate.plus({ days: 49 }).toISODate()
      : undefined,
    !excludeHolidays.includes(tweedePinksterdag)
      ? easterDate.plus({ days: 50 }).toISODate()
      : undefined,
    !excludeHolidays.includes(eersteKerstdag)
      ? `${year}-12-25`
      : undefined,
    !excludeHolidays.includes(tweedeKerstdag)
      ? `${year}-12-26`
      : undefined,
  ];

  // 5th of may is a national holiday every 5 years
  if (year % 5 === 0 && !excludeHolidays.includes(bevrijdingsdag)) {
    result.push(`${year}-05-05`);
  }

  return result.filter((item) => item);
};

export const holidays = [
  nieuwjaar,
  eerstePaasdag,
  tweedePaasdag,
  koningsdag,
  hemelvaartsdag,
  eerstePinksterdag,
  tweedePinksterdag,
  eersteKerstdag,
  tweedeKerstdag,
  bevrijdingsdag,
];

export default zone;
