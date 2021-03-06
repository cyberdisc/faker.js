function Name (faker) {

  this.firstName = function (gender) {
    if (typeof faker.definitions.name.male_first_name !== "undefined" && typeof faker.definitions.name.female_first_name !== "undefined") {
      // some locale datasets ( like ru ) have first_name split by gender. Since the name.first_name field does not exist in these datasets,
      // we must randomly pick a name from either gender array so faker.name.firstName will return the correct locale data ( and not fallback )
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.locales[faker.locale].name.male_first_name)
      } else {
        return faker.random.arrayElement(faker.locales[faker.locale].name.female_first_name);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.first_name);
  };

  this.middleName = function (gender) {
    if (typeof faker.definitions.name.male_middle_name !== "undefined" && typeof faker.definitions.name.female_middle_name !== "undefined") {
      // some locale datasets ( like ru ) have middle_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.locales[faker.locale].name.male_middle_name);
      } else {
        return faker.random.arrayElement(faker.locales[faker.locale].name.female_middle_name);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.middle_name);
  };

  this.lastName = function (gender) {
    if (typeof faker.definitions.name.male_last_name !== "undefined" && typeof faker.definitions.name.female_last_name !== "undefined") {
      // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (gender === 0) {
        return faker.random.arrayElement(faker.locales[faker.locale].name.male_last_name);
      } else {
        return faker.random.arrayElement(faker.locales[faker.locale].name.female_last_name);
      }
    }
    return faker.random.arrayElement(faker.definitions.name.last_name);
  };

  this.findName = function (firstName, lastName, gender) {
      var r = faker.random.number(8);
      var prefix, suffix, middleName;
      // in particular locales first and last names split by gender,
      // thus we keep consistency by passing 0 as male and 1 as female
      if (typeof gender !== 'number') {
        gender = faker.random.number(1);
      }
      if (!firstName) {
          firstName = faker.name.firstName(gender);
          // add middle names iterative
          while (faker.random.number(1)) {
              middleName = faker.name.middleName(gender);
              if (middleName) {
                  firstName += ' ' + middleName;
              }
          }
      }
      lastName = lastName || faker.name.lastName(gender);
      switch (r) {
      case 0:
          prefix = faker.name.prefix(gender);
          if (prefix) {
              return prefix + " " + firstName + " " + lastName;
          }
      case 1:
          suffix = faker.name.suffix(gender);
          if (suffix) {
              return firstName + " " + lastName + " " + suffix;
          }
      }

      return firstName + " " + lastName;
  };

  this.jobTitle = function () {
    return  faker.name.jobDescriptor() + " " +
      faker.name.jobArea() + " " +
      faker.name.jobType();
  };

  this.prefix = function (gender) {
      if (typeof faker.definitions.name.male_prefix !== "undefined" && typeof faker.definitions.name.female_prefix !== "undefined") {
          // some locale datasets ( like de ) have prefix split by gender.
          // see above comment of firstName method
          if (typeof gender !== 'number') {
              gender = faker.random.number(1);
          }
          if (gender === 0) {
              return faker.random.arrayElement(faker.locales[faker.locale].name.male_prefix);
          } else {
              return faker.random.arrayElement(faker.locales[faker.locale].name.female_prefix);
          }
      }
      return faker.random.arrayElement(faker.definitions.name.prefix);
  };

  this.suffix = function (gender) {
      if (typeof faker.definitions.name.male_suffix !== "undefined" && typeof faker.definitions.name.female_suffix !== "undefined") {
          // some locale datasets (may) have suffix split by gender.
          // see above comment of firstName method
          if (typeof gender !== 'number') {
              gender = faker.random.number(1);
          }
          if (gender === 0) {
              return faker.random.arrayElement(faker.locales[faker.locale].name.male_suffix);
          } else {
              return faker.random.arrayElement(faker.locales[faker.locale].name.female_suffix);
          }
      }
      return faker.random.arrayElement(faker.definitions.name.suffix);
  };

  this.title = function() {
      var descriptor  = faker.random.arrayElement(faker.definitions.name.title.descriptor),
          level       = faker.random.arrayElement(faker.definitions.name.title.level),
          job         = faker.random.arrayElement(faker.definitions.name.title.job);

      return descriptor + " " + level + " " + job;
  };

  this.jobDescriptor = function () {
    return faker.random.arrayElement(faker.definitions.name.title.descriptor);
  };

  this.jobArea = function () {
    return faker.random.arrayElement(faker.definitions.name.title.level);
  };

  this.jobType = function () {
    return faker.random.arrayElement(faker.definitions.name.title.job);
  };

}

module['exports'] = Name;
