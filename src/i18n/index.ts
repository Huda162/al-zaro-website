import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationsEN from './en.json'
import translationsAR from './ar.json'

const resources = {
    en: {
        translation: translationsEN,
    },
    ar: {
        translation: translationsAR,
    },
}

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources,
        supportedLngs: ['ar', 'en'],
        lng: localStorage.getItem("i18nextLng") || "ar"
    })