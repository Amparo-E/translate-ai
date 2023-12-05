import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "@/constants";
import { FromLanguage, Language } from "@/types";
import s from "./LanguageSelector.module.css"

type Props =
| { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: 'to', value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleCHange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <select onChange={handleCHange} value={value} className={s.select}>
        { type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </select>
  );
};
