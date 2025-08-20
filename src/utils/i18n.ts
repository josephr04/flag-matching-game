import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from "@/utils/Languages.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ['en', 'es', 'fr'],

    detection: {
      order: ['localStorage', 'navigator'],

      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;