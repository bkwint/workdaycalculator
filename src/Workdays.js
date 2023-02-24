const { DateTime } = require("luxon");

class Workdays {
  constructor(cache) {
    this.configs = [];
    this.cache = cache;
  }

  getKey(ref) {
    return `ref_${ref}`;
  };

  lazyLoadConfig(ref) {
    if (!this.configs[this.getKey(ref)]) {
      this.configs[this.getKey(ref)] = this.cache.get(ref);
    }
  };

  isWorkday(ref, date) {
    this.lazyLoadConfig(ref);

    const dt = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
    // get the index
    const index = this.configs[this.getKey(ref)].dayToIndex[dt];

    return this.configs[this.getKey(ref)].days[index] === dt;
  }

  getWorkday(ref, date, workdaysToAdd) {
    this.lazyLoadConfig(ref);

    // get the index
    const index = this.configs[this.getKey(ref)].dayToIndex[DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')];

    return this.configs[this.getKey(ref)].days[index + parseInt(workdaysToAdd, 10)-1];
  }

  flush(ref) {
    delete this.configs[this.getKey(ref)];
  }
};

module.exports = Workdays;