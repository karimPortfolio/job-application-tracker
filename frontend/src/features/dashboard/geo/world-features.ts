import { feature } from 'topojson-client'
import type { Feature, FeatureCollection } from 'geojson'
import worldTopo from '../data/world-countries.json'
import { countryNameToISO2 } from './country-iso'

//=== cast through unknown to satisfy topojson-client typings for this dataset
const geo = feature(
  worldTopo as unknown as Parameters<typeof feature>[0],
  (worldTopo as any).objects.countries
) as unknown as FeatureCollection

export const worldFeatures: Feature[] = geo.features
  .map((f: any) => {
    const iso2 = countryNameToISO2(f.properties?.name)
    if (!iso2) return null

    return {
      ...f,
      id: iso2, //=== critical: match ISO2 ids expected by choropleth
    } as Feature
  })
  .filter((f): f is Feature => Boolean(f))
