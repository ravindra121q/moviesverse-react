import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "hi"],
    nonExplicitSupportedLngs: true,
    debug: false,
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "cookie", "querystring"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          moviesList: "Movies List",
          popular: "Popular",
          nowPlaying: "Now Playing",
          upcoming: "Upcoming",
          topRated: "Top Rated",
          noResults: "No results",
          noResultsDesc: "Try a different keyword or clear the search to explore movies.",
          logout: "Logout",
          light: "Light",
          dark: "Dark",
          trailer: "Trailer",
          errors: {
            failedToLoadMovies: "Failed to load movies.",
            trailerNotAvailable: "Trailer not available.",
            trailerNotFound: "Trailer not found.",
          },
          language: {
            english: "English",
            hindi: "Hindi",
            switchToEnglish: "Switch to English",
            switchToHindi: "Switch to Hindi",
          },
          theme: {
            switchToLight: "Light",
            switchToDark: "Dark",
          },
          id: "ID",
          previous: "Previous",
          next: "Next",
          removeFromFavourite: "Remove from Favourites",
          addToFavourite: "Add to Favourites",
        },
      },
      hi: {
        translation: {
          moviesList: "फ़िल्मों की सूची",
          popular: "लोकप्रिय",
          nowPlaying: "अभी चल रही",
          upcoming: "आने वाली",
          topRated: "सर्वश्रेष्ठ रेटेड",
          noResults: "कोई परिणाम नहीं मिला",
          noResultsDesc: "कोई और कीवर्ड आज़माएँ या खोज साफ़ करें।",
          logout: "लॉगआउट",
          light: "हल्का",
          dark: "गहरा",
          trailer: "ट्रेलर",
          errors: {
            failedToLoadMovies: "फ़िल्में लोड करने में विफल।",
            trailerNotAvailable: "ट्रेलर उपलब्ध नहीं है।",
            trailerNotFound: "ट्रेलर नहीं मिला।",
          },
          language: {
            english: "English",
            hindi: "हिंदी",
            switchToEnglish: "अंग्रेज़ी पर स्विच करें",
            switchToHindi: "हिंदी पर स्विच करें",
          },
          theme: {
            switchToLight: "लाइट पर स्विच करें",
            switchToDark: "डार्क पर स्विच करें",
          },
          id: "आईडी",
          previous: "पूर्वी",
          next: "अगला",
          removeFromFavourite: "पसंदीदा से हटाएं",
          addToFavourite: "पसंदीदा में जोड़ें",
        },
      },
    },
  });

export default i18n;
