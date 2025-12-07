import { useState, type PropsWithChildren } from "react";
import { TranslatorProvider as AppTranslatorProvider } from "../libs/TranslatorProvider.tsx";
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
  const [lang, setLang] = useState<"fr" | "en" | "zh">("fr");
  return (
    <AppTranslatorProvider loader={loader} lang={lang} setLangV={setLang}>
      {children}
    </AppTranslatorProvider>
  );
}
