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

module.exports = {
  getMonthName,
  getRedirectFromSurname
};
