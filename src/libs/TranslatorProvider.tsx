import { CurrencyCode, type CurrencyKey } from "@/enum/CurrencyCode.ts";
import { units } from "@/enum/Unit.ts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";

const langs = ["fr", "en", "zh"] as const;

export type Langs = (typeof langs)[number];

const defaultValue = {
  langV: "fr" as Langs,
  setLangV: (() => {}) as Dispatch<SetStateAction<Langs>>,
  translations: {} as Record<string, string>,
  translate: (s: string) => s,
};

type Context = typeof defaultValue;

const TranslateContext = createContext(defaultValue);

type Props = {
  lang: Langs;
  setLangV: Dispatch<SetStateAction<Langs>>;
  loader: (lang: string) => Promise<Record<string, string>>;
};

export function TranslatorProvider({
  children,
  lang,
  loader,
}: PropsWithChildren<Props>) {
  const [langV, setLangV] = useState<Langs>(lang);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const translate = useCallback<Context["translate"]>(
    (s) => {
      return translations[s] || s;
    },
    [translations]
  );

  useEffect(() => {
    loader(langV).then(setTranslations);
  }, [langV, loader]);

  return (
    <TranslateContext.Provider
      value={{ langV, setLangV, translate, translations }}
    >
      {children}
    </TranslateContext.Provider>
  );
}

type StyleForUnits =
  | (typeof units)[number]
  | `${(typeof units)[number]}-${string}`;

type Options = Omit<Intl.NumberFormatOptions, "style" | "unit"> & {
  style?: "decimal" | "currency" | "unit" | "percent";
  unit?: StyleForUnits;
};

export function useTranslator() {
  const { translate, langV, setLangV } = useContext(TranslateContext);

  const dateFormat = (
    date: Date | string | number | null,
    options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
  ) => {
    if (!date) {
      return "";
    }
    if (typeof date === "string") {
      return new Intl.DateTimeFormat(langV, options).format(parseDate(date));
    }
    return new Intl.DateTimeFormat(langV, options).format(date);
  };

  const styleForNumber = (
    options: Options = {
      style: "decimal",
    }
  ) => {
    switch (options.style) {
      case "currency":
        return {
          currency: CurrencyCode[langV.toUpperCase() as CurrencyKey],
          style: "currency",
        };
      case "unit":
        return {
          style: "unit",
          unit: options.unit,
        };
      case "decimal":
      default:
        return {
          style: "decimal",
        };
    }
  };

  const numberFormat = (
    value: number | string | null,
    options: Options = {
      style: "decimal",
    }
  ) => {
    if (!value) {
      return "";
    }

    if (typeof value === "string") {
      return new Intl.NumberFormat(langV, {
        ...styleForNumber(options),
        ...options,
      }).format(parseDevice(value));
    }

    return value;
  };

  return {
    langV,
    setLangV,
    dateFormat: dateFormat,
    numberFormat,
    __: translate,
  };
}

function parseDate(date: Date | string): Date {
  if (typeof date === "string" && date.includes("/")) {
    const parts = date.split("/");
    return new Date(
      parseInt(parts[2], 10),
      parts[1] ? parseInt(parts[1], 10) - 1 : 0,
      parts[0] ? parseInt(parts[0], 10) : 1
    );
  }
  return new Date(date);
}

function parseDevice(value: number | string) {
  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d,\.]/g, "").replace(/\s/g, "");
    const normalized = cleaned.replace(",", ".");
    return parseFloat(normalized);
  }
  return value;
}
