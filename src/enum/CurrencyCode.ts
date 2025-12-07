import type { Langs } from "@/libs/TranslatorProvider.tsx";

enum Currency {
  FR = "EUR",
  EN = "USD",
  ES = "EUR",
  DE = "EUR",
  IT = "EUR",
  PT = "BRL",
  JA = "JPY",
  KO = "KRW",
  ZH = "CNY",
  AR = "AED",
  RU = "RUB",
  HI = "INR",
}

export type CurrencyKey = keyof typeof Currency;

export const CurrencyCode: Record<CurrencyKey, string> = Currency;
