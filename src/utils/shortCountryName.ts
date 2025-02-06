const countryShortNames = {
  greece: "grc",
  grc: "grc",
  unitedarabemirates: "uae",
  uae: "uae",
  croatia: "hrv",
  hrv: "hrv",
  cyprus: "cyp",
  cyp: "cyp",
};

export default (country: string) => countryShortNames[country.replace(/\s/g, "").toLocaleLowerCase()] || "";
