import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select.tsx";
import { useTranslator, type Langs } from "./libs/TranslatorProvider.tsx";

function App() {
  const { __, langV, setLangV, dateFormat, numberFormat, relativeDateFormat } =
    useTranslator();

  const handleValueChange = (value: Langs) => {
    setLangV(value);
  };

  return (
    <div className="mx-auto mt-8 mb-16 flex max-w-[652px] flex-col gap-12 px-7 md:mt-16 md:gap-8">
      <Select onValueChange={handleValueChange} defaultValue={langV}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={__("Langues")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr">{__("Français")}</SelectItem>
          <SelectItem value="en">{__("Anglais")}</SelectItem>
          <SelectItem value="zh">{__("Chinois")}</SelectItem>
        </SelectContent>
      </Select>

      <h1 className="text-2xl">{__("Internationalisation en informatique")}</h1>

      <p>
        {__(
          "En informatique, l'internationalisation et la localisation, souvent abrégées respectivement i18n et l10n, sont des moyens d'adaptation aux différentes langues, particularités régionales et exigences techniques d'une région cible."
        )}
      </p>

      <ul className="list-disc pl-6 space-y-1">
        <li>
          {__("Formats de dates :")} <code>{dateFormat("06/12/2024")}</code>
        </li>
        <li>
          {__("Devises :")}{" "}
          <code>{numberFormat("99,99 €", { style: "currency" })} </code>
        </li>
        <li>
          {__("Nombres :")} <code>{numberFormat("1 234,56")}</code>
        </li>
        <li>
          {__("Unités de mesure :")}{" "}
          <code>
            {numberFormat("100 km", {
              style: "unit",
              unitDisplay: "long",
              unit: "kilometer",
            })}
          </code>
        </li>
      </ul>

      <h3 className="text-lg">
        {__(
          "Les systèmes i18n doivent également prendre en compte d'autres aspects essentiels"
        )}
      </h3>

      <ul className="list-disc pl-6 space-y-1">
        <li>
          {__("Températures :")}{" "}
          <code>
            {" "}
            {numberFormat("22 °C", {
              style: "unit",
              unit: "celsius",
              unitDisplay: "long",
            })}{" "}
          </code>
        </li>
        <li>
          {__("Tailles de fichiers :")}{" "}
          <code>
            {numberFormat("2,4 Mo", {
              style: "unit",
              unit: "megabyte",
              unitDisplay: "long",
            })}{" "}
            {numberFormat("1,2 To", {
              style: "unit",
              unit: "terabyte",
              unitDisplay: "long",
            })}
          </code>
        </li>
        <li>
          {__("Pourcentages :")}{" "}
          <code>
            {numberFormat("0.95", {
              style: "percent",
              signDisplay: "exceptZero",
            })}
          </code>
        </li>
      </ul>
    </div>
  );
}

export default App;
