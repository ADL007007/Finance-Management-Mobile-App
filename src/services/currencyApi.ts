export interface RateItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

interface ErApiResponse {
  result: string;
  time_last_update_utc?: string;
  rates?: Record<string, number>;
}

function getErApiDate(utcString?: string): string {
  if (!utcString) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(utcString);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString().slice(0, 10)
    : parsed.toISOString().slice(0, 10);
}

async function fetchRatesFromErApi(
  base: string,
  quotes: string[]
): Promise<RateItem[]> {
  const normalizedBase = base.toUpperCase();
  const res = await fetch(`https://open.er-api.com/v6/latest/${normalizedBase}`);
  if (!res.ok) {
    throw new Error(`Не удалось загрузить курсы валют (${res.status})`);
  }

  const json: ErApiResponse = await res.json();
  if (!json.rates) return [];

  const dateStr = getErApiDate(json.time_last_update_utc);

  return quotes
    .map((q) => q.toUpperCase())
    .filter(
      (q) => q !== normalizedBase && typeof json.rates?.[q] === 'number'
    )
    .map((q) => ({
      date: dateStr,
      base: normalizedBase,
      quote: q,
      rate: json.rates![q],
    }));
}

async function fetchKztRate(base: string): Promise<RateItem | null> {
  try {
    const items = await fetchRatesFromErApi(base, ['KZT']);
    return items[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchExchangeRates(
  base = 'USD',
  quotes: string[] = ['KZT', 'EUR', 'GBP', 'JPY', 'CHF']
): Promise<RateItem[]> {
  const normalizedBase = base.toUpperCase();
  const upperQuotes = quotes.map((q) => q.toUpperCase());

  const includeKzt =
    upperQuotes.includes('KZT') && normalizedBase !== 'KZT';

  const frankfurterQuotes = upperQuotes.filter(
    (q) => q !== normalizedBase && q !== 'KZT'
  );

  const params = new URLSearchParams({
    base: normalizedBase,
    quotes: frankfurterQuotes.join(','),
  });

  const [frankfurterRes, kztItem] = await Promise.all([
    frankfurterQuotes.length > 0
      ? fetch(`https://api.frankfurter.dev/v2/rates?${params.toString()}`)
      : Promise.resolve(null),
    includeKzt ? fetchKztRate(normalizedBase) : Promise.resolve(null),
  ]);

  let list: RateItem[] = [];

  if (frankfurterRes) {
    if (frankfurterRes.ok) {
      const data: RateItem[] = await frankfurterRes.json();
      list = data.filter((item) => item.quote !== item.base);
    } else if (frankfurterQuotes.length > 0) {
      // Если frankfurter не поддержал выбранную базу (например, KZT) или вернул ошибку — берём из er-api
      list = await fetchRatesFromErApi(normalizedBase, frankfurterQuotes);
    }
  }

  if (kztItem) {
    return [kztItem, ...list];
  }

  return list;
}