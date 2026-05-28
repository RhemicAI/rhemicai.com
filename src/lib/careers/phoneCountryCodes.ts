export const phoneCountryCodes = [
  { label: "US/CA", code: "+1" },
  { label: "UK", code: "+44" },
  { label: "India", code: "+91" },
  { label: "Pakistan", code: "+92" },
  { label: "UAE", code: "+971" },
  { label: "Mexico", code: "+52" },
  { label: "Brazil", code: "+55" },
  { label: "Australia", code: "+61" },
  { label: "Germany", code: "+49" },
  { label: "France", code: "+33" },
  { label: "Spain", code: "+34" },
  { label: "Italy", code: "+39" },
  { label: "Netherlands", code: "+31" },
  { label: "South Africa", code: "+27" },
  { label: "Philippines", code: "+63" },
  { label: "Singapore", code: "+65" },
  { label: "Saudi", code: "+966" },
  { label: "Turkey", code: "+90" },
  { label: "Nigeria", code: "+234" },
  { label: "Other", code: "+" },
] as const;

export function isSupportedPhoneCountryCode(value: string) {
  return phoneCountryCodes.some((countryCode) => countryCode.code === value);
}
