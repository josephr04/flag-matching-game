import { useState } from "react";
import { useTranslation } from "react-i18next";
import IMAGES from "@/assets/images/images";

const languages = [
  { code: "en", lang: "English", flag: IMAGES.enFlag },
  { code: "es", lang: "Español", flag: IMAGES.esFlag },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-md hover:bg-gray-100 cursor-pointer"
      >
        <img src={currentLang.flag} alt={currentLang.lang} className="w-5 h-5 rounded-full"/>
        <span>{currentLang.lang}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <ul className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
          {languages.map(l => (
            <li 
              key={l.code} 
              onClick={() => handleLanguageChange(l.code)}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={l.flag} alt={l.lang} className="w-5 h-5 rounded-full"/>
              {l.lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
