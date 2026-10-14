import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en";
import fr from "@/locales/fr";
import mg from "@/locales/mg";
import { storage } from "./storage";

export const LANGUAGES = [
  { value: "en-EN", label: "EN", icon: "/images/royaume-uni.png" },
  { value: "fr-FR", label: "FR", icon: "/images/france.png" },
  { value: "mg-MG", label: "MG", icon: "/images/madagascar.png" },
] as const;

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    mg: { translation: mg },
  },
  lng: storage.getLanguage() ?? "fr-FR",
  fallbackLng: "fr-FR",
  interpolation: { escapeValue: false },
});

export function changeLanguage(lang: string) {
  storage.setLanguage(lang);
  void i18n.changeLanguage(lang);
}

export default i18n;
