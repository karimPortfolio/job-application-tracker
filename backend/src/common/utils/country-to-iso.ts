import countries from 'i18n-iso-countries'

function normalizeCountry(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

export function countryNameToISO(countryName: string): string | undefined {
  return countries.getAlpha2Code(
    normalizeCountry(countryName),
    'en'
  ) || undefined
}
