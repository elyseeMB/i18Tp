export const CurrencyCode = {
  FR: "EUR",
  EN: "USD",
  ES: "EUR",
  DE: "EUR",
  IT: "EUR",
  PT: "BRL",
  JA: "JPY",
  KO: "KRW",
  ZH: "CNY",
  AR: "AED",
  RU: "RUB",
  HI: "INR",
} as const;

export type CurrencyKey = keyof typeof CurrencyCode;
