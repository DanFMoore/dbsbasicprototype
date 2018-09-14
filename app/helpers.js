function getMonthName(n) {
  const months = [
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

  const month = months[Number(n)];

  if (!month) {
    return months[0];
  }

  return month;
}

module.exports = {
  getMonthName
};
