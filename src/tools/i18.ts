import { writeFileSync, readFileSync, globSync, existsSync } from "node:fs";

const sourcePath = "./src/**/*.{ts,tsx}";
const outputPath = "./src/locales/{lang}.json";

const langs = ["en", "zh", "fr", "es", "ja", "ar"];

type Dict = Map<string, string>;

function extractStringsFromContent(content: string): string[] {
  const results: string[] = [];
  const regex = /__\(\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    const raw = m[2];
    const quote = m[1];
    const value = unescapeString(raw, quote);
    if (!results.includes(value)) {
      results.push(value);
    }
  }
  return results;
}

function readJson(file: string): Dict {
  const dict = new Map<string, string>();
  if (!existsSync(file)) {
    writeFileSync(file, "{}", "utf8");
    return dict;
  }
  const buf = readFileSync(file, "utf8");
  const obj = JSON.parse(buf) as Record<string, unknown>;
  return new Map(Object.entries(obj)) as Dict;
}

function writeJson(file: string, dict: Dict) {
  //@ts-ignore
  const entries = Array.from(dict.entries()).toSorted((a, b) =>
    a[0].localeCompare(b[0])
  );
  writeFileSync(
    file,
    JSON.stringify(Object.fromEntries(entries), null, 2),
    "utf8"
  );
}

function unescapeString(s: string, quote: string): string {
  // Handle common JS escapes and the specific quote type
  return s
    .replace(new RegExp("\\\\" + quote, "g"), quote) // unescape the quote
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\`/g, "`")
    .replace(/\\\\/g, "\\");
}

function collectStrings() {
  const files = globSync(sourcePath);
  files.sort();
  const strings = new Set<string>();
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const found = extractStringsFromContent(content);
    for (const s of found) {
      strings.add(s);
    }
  }

  return strings;
}

const keys = collectStrings();
for (const lang of langs) {
  const outFile = outputPath.replace("{lang}", lang);
  const dict = readJson(outFile);
  const existingKeys = new Set(dict.keys());

  console.log(`# Creating ${lang} translations`);
  //@ts-ignore
  for (const newKey of keys.difference(existingKeys)) {
    dict.set(newKey, "");
    console.log("+ " + newKey);
  }
  //@ts-ignore
  for (const removedKey of existingKeys.difference(keys)) {
    dict.delete(removedKey);
    console.log("- " + removedKey);
  }
  writeJson(outFile, dict);
  console.log(`✓ done. Writing to ${outFile}`);
  console.log("");
}
