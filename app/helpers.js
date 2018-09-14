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

module.exports = {
  getMonthName
};
