import { createI18n } from 'vue-i18n';

// Define translations for each language
const welcometran = {
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
  fi: {
    welcome: 'Tervetuloa CineRateen',
    description: 'Arvioi suosikkielokuvasi!',
  },
};

const messages = {
  en: {
    movies: {
      "Avengers: Infinity War": "Avengers: Infinity War",
      "Avengers: Endgame": "Avengers: Endgame",
      "Cover": "Cover",
      "Black Panther": "Black Panther",
      "Iron Man 2": "Iron Man 2",
      "Guardians of the Galaxy": "Guardians of the Galaxy",
      "Lorem Ipsum": "Lorem Ipsum",
      "Smile": "Smile",
    },
    buttons: {
      addMovie: "Add Movie",
      login: "Login",
      logout: "Logout",
      searchPlaceholder: "Search for a movie...",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",
      usernamePlaceholder: "Enter your username",
      register: "Register",
    },
    
    words: {
      email: "Email",
      password: "Password",
      username: "Username",
    },
  },
  de: {
    movies: {
      "Avengers: Infinity War": "Avengers: Infinity War",
      "Avengers: Endgame": "Avengers: Endgame",
      "Cover": "Cover",
      "Black Panther": "Black Panther",
      "Iron Man 2": "Iron Man 2",
      "Guardians of the Galaxy": "Wächter der Galaxie",
      "Lorem Ipsum": "Lorem Ipsum",
      "Smile": "Smile",
    },
    buttons: {
      addMovie: "Film hinzufügen",
      login: "Anmelden",
      logout: "Abmelden",
      searchPlaceholder: "Nach einem Film suchen...",
      emailPlaceholder: "Geben Sie Ihre E-Mail ein",
      passwordPlaceholder: "Geben Sie Ihr Passwort ein",
      usernamePlaceholder: "Geben Sie Ihren Benutzernamen ein",
      register: "Registrieren",
    },
    words: {
      email: "E-Mail",
      password: "Passwort",
      username: "Benutzername",
    },
    nmc: {
      nmc0: "Keine Filme gefunden, die",
      found: "enthalten",
    }
  },
  it: {
    movies: {
      "Avengers: Infinity War": "Avengers: Infinity War",
      "Avengers: Endgame": "Avengers: Endgame",
      "Cover": "Copertina",
      "Black Panther": "Black Panther",
      "Iron Man 2": "Iron Man 2",
      "Guardians of the Galaxy": "Guardiani della Galassia",
      "Lorem Ipsum": "Lorem Ipsum",
      "Smile": "Smile",
    },
    buttons: {
      addMovie: "Aggiungi film",
      login: "Accedi",
      logout: "Esci",
      searchPlaceholder: "Cerca un film...",
      emailPlaceholder: "Inserisci la tua email",
      passwordPlaceholder: "Inserisci la tua password",
      usernamePlaceholder: "Inserisci il tuo nome utente",
      register: "Registrati",
    },
    words: {
      email: "Email",
      password: "Password",
      username: "Nome utente",
    },
    nmc: {
      nmc0: "Nessun film trovato che",
      found: "contiene",
    }    
  },
  sp: {
    movies: {
      "Avengers: Infinity War": "Avengers: Infinity War",
      "Avengers: Endgame": "Avengers: Endgame",
      "Cover": "Portada",
      "Black Panther": "Black Panther",
      "Iron Man 2": "Iron Man 2",
      "Guardians of the Galaxy": "Guardianes de la Galaxia",
      "Lorem Ipsum": "Lorem Ipsum",
      "Smile": "Smile",
    },
    buttons: {
      addMovie: "Agregar película",
      login: "Iniciar sesión",
      logout: "Cerrar sesión",
      searchPlaceholder: "Buscar una película...",
      emailPlaceholder: "Ingresa tu correo electrónico",
      passwordPlaceholder: "Ingresa tu contraseña",
      usernamePlaceholder: "Ingresa tu nombre de usuario",
      register: "Registrarse",
    },
    words: {
      email: "Correo electrónico",
      password: "Contraseña",
      username: "Nombre de usuario",
    },
    nmc: {
      nmc0: "No se encontraron películas que",
      found: "contengan",
    }
    
  },
  zh: {
    movies: {
      "Avengers: Infinity War": "复仇者联盟：无限战争",
      "Avengers: Endgame": "复仇者联盟：终局之战",
      "Cover": "封面",
      "Black Panther": "黑豹",
      "Iron Man 2": "钢铁侠2",
      "Guardians of the Galaxy": "银河护卫队",
      "Lorem Ipsum": "Lorem Ipsum",
      "Smile": "微笑",
    },
    buttons: {
      addMovie: "添加电影",
      login: "登录",
      logout: "登出",
      searchPlaceholder: "搜索电影...",
      emailPlaceholder: "输入你的邮箱",
      passwordPlaceholder: "输入你的密码",
      usernamePlaceholder: "输入你的用户名",
      register: "注册",
    },
    words: {
      email: "邮箱",
      password: "密码",
      username: "用户名",
    },
    nmc: {
      nmc0: "未找到包含",
      found: "的电影",
    }
    
  },
  fi: {
    movies: {
      "Avengers: Infinity War": "Avengers: Infinity War",
      "Avengers: Endgame": "Avengers: Endgame",
      "Cover": "Kansi",
      "Black Panther": "Black Panther",
      "Iron Man 2": "Iron Man 2",
      "Guardians of the Galaxy": "Galaksin Vartijat",
      "Lorem Ipsum": "Lorem Ipsum",
      "Smile": "Hymy",
    },
    buttons: {
      addMovie: "Lisää elokuva",
      login: "Kirjaudu sisään",
      logout: "Kirjaudu ulos",
      searchPlaceholder: "Etsi elokuvaa...",
      emailPlaceholder: "Syötä sähköpostisi",
      passwordPlaceholder: "Syötä salasanasi",
      usernamePlaceholder: "Syötä käyttäjätunnuksesi",
      register: "Rekisteröidy",
    },
    words: {
      email: "Sähköposti",
      password: "Salasana",
      username: "Käyttäjätunnus",
    },
    nmc: {
      nmc0: "Ei löytynyt elokuvia, jotka",
      found: "sisältävät",
    }    
  },
  
   
  
};

// Create the i18n instance
const i18n = createI18n({
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback language
  welcometran, // Translations welcome messages
  messages, // Translations for movies and buttons
});

export default i18n;