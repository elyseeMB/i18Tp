import { motion, AnimatePresence, type Transition } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select.tsx";
import { useTranslator, type Langs } from "./libs/TranslatorProvider.tsx";

function App() {
  const { __, langV, setLangV, dateFormat, numberFormat } = useTranslator();

  const handleValueChange = (value: Langs) => {
    setLangV(value);
  };

  // Configuration Spring
  const springTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
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
          <SelectItem value="es">{__("Espagnol")}</SelectItem>
          <SelectItem value="ja">{__("Japonais")}</SelectItem>
          <SelectItem value="ar">{__("Arabe")}</SelectItem>
        </SelectContent>
      </Select>

      <AnimatePresence mode="wait">
        <motion.h1
          key={`title-${langV}`}
          className="text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ ...springTransition, delay: 0 }}
        >
          {__("Internationalisation en informatique")}
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${langV}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ ...springTransition, delay: 0.05 }}
        >
          {__(
            "En informatique, l'internationalisation et la localisation, souvent abrégées respectivement i18n et l10n, sont des moyens d'adaptation aux différentes langues, particularités régionales et exigences techniques d'une région cible."
          )}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.ul
          key={`list1-${langV}`}
          className="list-disc pl-6 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
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
        </motion.ul>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.h3
          key={`subtitle-${langV}`}
          className="text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ ...springTransition, delay: 0.15 }}
        >
          {__(
            "Les systèmes i18n doivent également prendre en compte d'autres aspects essentiels"
          )}
        </motion.h3>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.ul
          key={`list2-${langV}`}
          className="list-disc pl-6 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ ...springTransition, delay: 0.2 }}
        >
          <li>
            {__("Températures :")}{" "}
            <code>
              {numberFormat("22 °C", {
                style: "unit",
                unit: "celsius",
                unitDisplay: "long",
              })}
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
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

export default App;
