import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import it from './locales/it.json'
import sp from './locales/sp.json'
import zh from './locales/zh.json'

const i18n = createI18n({
    locale: 'en', // Standardsprache
    fallbackLocale: 'en', // Fallback, falls Übersetzung fehlt
    messages: { en, de, sp, zh, it }
  });

const app = createApp(App)
app.use(i18n);
app.use(router)

app.mount('#app')
