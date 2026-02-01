import { useEffect, useState } from "react";

export interface Country {
  code: string;
  name: string;
  flag: string;
}

let cachedCountries: Country[] | null = null;
let inflight: Promise<Country[]> | null = null;

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>(cachedCountries ?? []);
  const [loading, setLoading] = useState(!cachedCountries);

  useEffect(() => {
    let mounted = true;

    const ensureCountries = async () => {
      if (cachedCountries) {
        setLoading(false);
        return;
      }

      if (!inflight) {
        inflight = fetch(
          `${process.env.NEXT_PUBLIC_COUNTRIES_API}?fields=cca2,name,flags`
        )
          .then((res) => res.json())
          .then((data) =>
            data
              .map((c: any) => ({
                code: c.cca2,
                name: c.name.common,
                flag: c.flags.svg,
              }))
              .sort((a: Country, b: Country) => a.name.localeCompare(b.name)),
          )
          .catch(() => []);
      }

      const result = await inflight;
      if (!mounted) return;

      cachedCountries = result;
      setCountries(result);
      setLoading(false);
    };

    ensureCountries();

    return () => {
      mounted = false;
    };
  }, []);

  return { countries, loading };
}
