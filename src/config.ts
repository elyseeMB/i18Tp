export const langs = ["en", "zh", "fr", "es", "ja", "ar"] as const;
export type Langs = (typeof langs)[number];
