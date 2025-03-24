import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'; // Import the i18n instance

const app = createApp(App)

app.use(router)
app.use(i18n); // Use i18n in the app

app.mount('#app')
