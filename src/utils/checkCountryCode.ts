const validCountryCodes = ["GRC", "UAE", "HRV", "CYP"];

const checkCountryCode = (countryCode: string): boolean => {
  return countryCode ? validCountryCodes.includes(countryCode.toLocaleUpperCase()) : false;
};

export default checkCountryCode;
