import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(en)

export function normalizeCountry(name: string) {
  return name.toLowerCase().trim()
}

export function countryNameToISO2(name: string): string | undefined {
  return countries.getAlpha2Code(
    normalizeCountry(name),
    'en'
  )
}

export function iso2ToCountryName(code: string): string {
  return countries.getName(code.toUpperCase(), 'en') || code.toUpperCase()
}

export function iso2ToFlagEmoji(code: string): string {
  // Converts ISO2 code to regional indicator symbols
  return code
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join('')
}

export function iso2ToFlagSrc(code: string): string {
  // Use FlagCDN small PNGs to keep payload light
  const lower = code.toLowerCase()
  return `https://flagcdn.com/w20/${lower}.png`
}
