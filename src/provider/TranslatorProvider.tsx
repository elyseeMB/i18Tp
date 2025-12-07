import { useState, type PropsWithChildren } from "react";
import { TranslatorProvider as AppTranslatorProvider } from "../libs/TranslatorProvider.tsx";
import type { Langs } from "@/config.ts";
const locales = import.meta.glob("../locales/*.json", { eager: true });

/**
 * todo : implement a way to retrieve translations strings
 */
const loader = async (lang: string) => {
  const path = `../locales/${lang}.json`;
  if (!locales[path]) {
    return;
  }
  const module = locales[path];
  //@ts-ignore
  return module.default;
};

export function TranslatorProvider({ children }: PropsWithChildren<{}>) {
  const locale = navigator.language.split("-")[0] as Langs;
  const [lang, setLang] = useState<Langs>(locale);
  return (
    <AppTranslatorProvider loader={loader} lang={lang} setLangV={setLang}>
      {children}
    </AppTranslatorProvider>
  );
}
