import { DateTime } from 'luxon';

const nieuwjaarsdag = 'nieuwjaarsdag';
const paasmaandag = 'paasmaandag';
const dagVanDeArbeid = 'dag van de arbeid';
const OHHemelvaart = 'O.H. Hemelvaart';
const pinkstermaandag = 'pinkstermaandag';
const nationaleFeestdag = 'nationale feestdag';
const OLVhemelvaart = 'O.L.V hemelvaart';
const allerheiligen = 'allerheiligen';
const wapenstilstand = 'wapenstilstand';
const eersteKerstdag = 'eerste kerstdag';

const be = (year: number, excludeHolidays: string[], easterDate: DateTime) => [
  !excludeHolidays.includes(nieuwjaarsdag)
    ? `${year}-01-01`
    : undefined,
  !excludeHolidays.includes(paasmaandag)
    ? easterDate.plus({ days: 1 }).toISODate()
    : undefined,
  !excludeHolidays.includes(dagVanDeArbeid)
    ? `${year}-05-01`
    : undefined,
  !excludeHolidays.includes(OHHemelvaart)
    ? easterDate.plus({ days: 39 }).toISODate()
    : undefined,
  !excludeHolidays.includes(pinkstermaandag)
    ? easterDate.plus({ days: 50 }).toISODate()
    : undefined,
  !excludeHolidays.includes(nationaleFeestdag)
    ? `${year}-07-21`
    : undefined,
  !excludeHolidays.includes(OLVhemelvaart)
    ? `${year}-08-15`
    : undefined,
  !excludeHolidays.includes(allerheiligen)
    ? `${year}-11-01`
    : undefined,
  !excludeHolidays.includes(wapenstilstand)
    ? `${year}-11-11`
    : undefined,
  !excludeHolidays.includes(eersteKerstdag)
    ? `${year}-12-25`
    : undefined,
].filter((item) => item);

export const holidays = [
  nieuwjaarsdag,
  paasmaandag,
  dagVanDeArbeid,
  OHHemelvaart,
  pinkstermaandag,
  nationaleFeestdag,
  OLVhemelvaart,
  allerheiligen,
  wapenstilstand,
  eersteKerstdag,
];

export default be;
