const convertMonthNumberToName = (monthNumber) => {
    console.log(monthNumber)
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Invalid month number. Must be between 1 and 12.");
  }

  return monthNames[monthNumber - 1]; 
};

module.exports = { convertMonthNumberToName };
