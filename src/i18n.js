import { createI18n } from 'vue-i18n';

// Define translations for each language
const messages = {
  en: {
    welcome: 'Welcome to CineRate',
    description: 'Rate your favorite movies!',
  },
  de: {
    welcome: 'Willkommen bei CineRate',
    description: 'Bewerten Sie Ihre Lieblingsfilme!',
  },
  it: {
    welcome: 'Benvenuto su CineRate',
    description: 'Valuta i tuoi film preferiti!',
  },
  es: {
    welcome: 'Bienvenido a CineRate',
    description: '¡Califica tus películas favoritas!',
  },
  zh: {
    welcome: '欢迎来到CineRate',
    description: '评价你最喜欢的电影！',
  },
};

// Create the i18n instance
const i18n = createI18n({
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback language
  messages, // Translations
});

export default i18n;