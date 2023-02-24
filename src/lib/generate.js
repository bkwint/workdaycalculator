const { easter } = require('date-easter');
const { DateTime } = require('luxon');

const { flattenDeep } = require('lodash');

const getHolidays = (year, country) => {
    const pasen = DateTime.fromISO(easter(year).toString());

    switch (country) {
        case 'nl':
            return [
                `${year}-01-01`,                    // nieuwjaar
                pasen.toISODate(),                  // eerste paas dag
                pasen.plus({ days: 1}).toISODate(), // tweede paas dag
                `${year}-04-27`,                    // koningsdag
                pasen.plus({days: 39}).toISODate(), // hemelvaartsdag
                pasen.plus({days: 49}).toISODate(), // 1ste pinksterdag
                pasen.plus({days: 50}).toISODate(), // 2de pinksterdag
                `${year}-12-25`,                    // 1ste kerstdag
                `${year}-12-26`,                    // 2de kerstdag
            ];
        case 'be':
            return [
                `${year}-01-01`,                    // nieuwjaar
                pasen.plus({ days: 1}).toISODate(), // Paasmaandag
                `${year}-05-01`,                    // Dag van de Arbeid
                pasen.plus({days: 39}).toISODate(), // O.H. Hemelvaart
                pasen.plus({days: 50}).toISODate(), // Pinkstermaandag
                `${year}-07-21`,                    // Nationale feestdag
                `${year}-08-15`,                    // O.L.V hemelvaart
                `${year}-11-11`,                    // wapenstilstand
                `${year}-12-25`,                    // 1ste kerstdag
            ];
        default:
            return [];
    }
}

const generate = (config, ref) => {
    const _config = config.get(ref);

    let now = DateTime.now().startOf('day');
    const endDate = DateTime.fromISO(_config.maxDate);

    workdays = {
        dayToIndex: {},
        days: []
    };

    // generate the holidays for every year in the range
    const startYear = DateTime.now().year;
    const endYear = endDate.year;
    const holidaysPerYear = [];
    for (let i = startYear; i < endYear; i += 1) {
        holidaysPerYear.push(getHolidays(i, _config.country));
    }

    const holidays = flattenDeep(holidaysPerYear);

    let i = 0;
    while (now < endDate) {
        workdays.dayToIndex[now.toISODate()] = i;
        
        // determin the day and the string representation of the date
        if (
            !holidays.includes(now.toISODate()) && // if is no holiday
            _config.workdays.includes(now.weekday) && // and it is a workday of the week
            !_config.exclude.includes(now.toISODate()) // and it is not a special close day
        ) {
            workdays.days.push(now.toISODate());
            i += 1;
        }

        now = now.plus({ days: 1 });
    }

    return workdays;
};

module.exports = generate;