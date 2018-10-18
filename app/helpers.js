var config = require('./config');

function getMonthName(n) {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  var month = months[Number(n)];

  if (!month) {
    return months[0];
  }

  return month;
}

function getRedirectFromSurname(surname) {
  surname = surname.toLowerCase();
  var redirect = config.surnamesToStatusPages.fallback;

  Object.keys(config.surnamesToStatusPages).forEach(function (i) {
    if (surname.indexOf(i) === 0) {
      redirect = config.surnamesToStatusPages[i];
    }
  });

  return redirect;
}

function createMissingName(req) {
  if (!req.session.mainName || !req.session.mainName['first-name']) {
    var female = Math.random() >= 0.5;

    req.session.mainName = {
      'first-name': female ? 'Jessica' : 'James',
      'middle-names': female ? 'Christine' : 'Christopher',
      'last-name': 'Smith'
    };
  }
}

function createMissingGender(req) {
  if (!req.session.gender) {
    var female = req.session.mainName['first-name'] === 'Jessica';
    req.session.gender = female ? 'Female' : 'Male';
  }
}

function createMissingAddress(req) {
  if (!req.session.addresses || !req.session.addresses[0]['new-address-line-1']) {
    req.session.addresses = [{
      'new-address-line-1': '58 Princes Street',
      'new-address-town-city': 'Romsey',
      'new-address-country': 'United Kingdom',
      'new-address-postcode': 'SO51 9EL',
      'address-since-year': '2012',
      'radio-group-current-address': 'Yes',
      type: 'main'
    }];
  }
}

module.exports = {
  getMonthName,
  getRedirectFromSurname,
  createMissingName,
  createMissingGender,
  createMissingAddress
};
