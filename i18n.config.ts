import en from "~/locales/en.json";
import fr from "~/locales/fr.json";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    fr,
  },
  datetimeFormats: {
    en: {
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long",
      },
    },
    fr: {
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long",
      },
    },
  },
}));
