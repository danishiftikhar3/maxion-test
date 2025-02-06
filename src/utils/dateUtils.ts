export const calculateMonthsFromGivenDateRange = ({ start_year, start_month, end_year, end_month }) => {
  const startYear = parseInt(start_year, 10);
  const startMonth = parseInt(start_month, 10);
  const endYear = parseInt(end_year, 10);
  const endMonth = parseInt(end_month, 10);
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth + 1);
  return totalMonths;
};

export const validateDateRange = ({ start_year, start_month, end_year, end_month }) => {
  let isValid = true;
  let message = "";

  // Parse inputs to integers
  const startYear = parseInt(start_year, 10);
  const startMonth = parseInt(start_month, 10);
  const endYear = parseInt(end_year, 10);
  const endMonth = parseInt(end_month, 10);

  // Validate that the parsed values are valid numbers
  if (isNaN(startYear) || isNaN(startMonth) || isNaN(endYear) || isNaN(endMonth)) {
    isValid = false;
    message = "All inputs must be valid numbers.";
  } else if (startYear < 0 || endYear < 0) {
    // Validate non-negative years
    isValid = false;
    message = "Years must be non-negative integers.";
  } else if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
    // Validate valid months
    isValid = false;
    message = "Months must be between 1 and 12.";
  } else if (startYear > endYear || (startYear === endYear && startMonth > endMonth)) {
    // Validate that start date is earlier than or equal to end date
    isValid = false;
    message = "Start date must be earlier than or equal to end date.";
  }

  return {
    isValid,
    message,
  };
};

export function getLastYearDates(): {
  start_year: number;
  start_month: number;
  end_year: number;
  end_month: number;
} {
  // id dates of 2023 are given, then the last year range would be 2022
  const currentYear = new Date().getFullYear();

  const start_year = currentYear - 1;
  const start_month = 1;
  const end_year = currentYear - 1;
  const end_month = 12;

  return { start_year, start_month, end_year, end_month };
}

export function get12MonthsLessOfGivenDateRange({ start_year, start_month, end_year, end_month }) {
  // Calculate total months in the given range
  const totalMonths = calculateMonthsFromGivenDateRange({ start_year, start_month, end_year, end_month });

  // Subtract 12 months from the end date
  let prev_end_month = end_month - 12;
  let prev_end_year = end_year;
  if (prev_end_month <= 0) {
    prev_end_year -= 1;
    prev_end_month += 12;
  }

  // Subtract 12 months from the start date
  let prev_start_month = start_month - 12;
  let prev_start_year = start_year;
  if (prev_start_month <= 0) {
    prev_start_year -= 1;
    prev_start_month += 12;
  }

  // Ensure the end date does not go below January 2019
  if (totalMonths > 12 || prev_end_year < 2019 || (prev_end_year === 2019 && prev_end_month < 1)) {
    return {
      prev_start_year: null,
      prev_start_month: null,
      prev_end_year: null,
      prev_end_month: null,
    };
  }

  return {
    prev_start_year,
    prev_start_month,
    prev_end_year,
    prev_end_month,
  };
}
