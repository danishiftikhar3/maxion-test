export default function adjustDateRangeLessThen12Months(startYear, startMonth, endYear, endMonth) {
  // Convert the start and end dates to Date objects
  const startDate = new Date(startYear, startMonth - 1); // -1 because JS months are 0-indexed
  const endDate = new Date(endYear, endMonth - 1);

  // Calculate the difference in months
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

  // If the difference is less than 12 months, adjust the dates
  if (totalMonths < 12) {
    const adjustment = Math.floor((12 - totalMonths) / 2);

    startDate.setMonth(startDate.getMonth() - adjustment);
    endDate.setMonth(endDate.getMonth() + adjustment);

    // Handle case where months go out of the 0-11 range
    if (startDate.getMonth() < 0) {
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setMonth(startDate.getMonth() + 12);
    }
    if (endDate.getMonth() > 11) {
      endDate.setFullYear(endDate.getFullYear() + 1);
      endDate.setMonth(endDate.getMonth() - 12);
    }
  }

  return {
    startYear: startDate.getFullYear(),
    startMonth: startDate.getMonth() + 1, // +1 because JS months are 0-indexed
    endYear: endDate.getFullYear(),
    endMonth: endDate.getMonth() + 1,
  };
}
