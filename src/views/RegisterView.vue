<script setup>
import { register } from "@/api/routes/userRoutes";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
const router = useRouter();

const isDropdownVisible = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const changeLanguage = (lang) => {
  locale.value = lang;
  isDropdownVisible.value = false;
};

const handleregister = async () => {
  errorMessage.value = "";
  try {
    const result = await register(username.value, email.value, password.value);

    if (result?.success || result?.id) {
      console.log("Registrierung erfolgreich:", result);
      router.push("/login");
    } else {
      errorMessage.value =
        "Registrierung fehlgeschlagen. Bitte überprüfe deine Daten.";
    }
  } catch (error) {
    console.error("Fehler bei Registrierung:", error);
    errorMessage.value = "Serverfehler oder ungültige Eingaben.";
  }
};

const RouteToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="container">
    <div class="register-view">
      <div class="back-button">
        <button class="backbutton" id="backbutton">
          <img
            src="@/assets/images/icons/BackIcon.svg"
            id="back-icon"
            @click="$router.push('/')"
          />
        </button>
      </div>
      <div id="globe-dropdown-container">
        <button id="globe-button" @click="toggleDropdown">
          <img src="@/assets/images/icons/GlobeIcon.svg" id="globe-icon" />
        </button>
        <div v-if="isDropdownVisible" id="globe-dropdown">
          <div class="dropdown-option" @click="changeLanguage('en')">
            English 🇬🇧
          </div>
          <div class="dropdown-option" @click="changeLanguage('de')">
            Deutsch 🇩🇪
          </div>
          <div class="dropdown-option" @click="changeLanguage('it')">
            Italiano 🇮🇹
          </div>
          <div class="dropdown-option" @click="changeLanguage('sp')">
            Español 🇪🇸
          </div>
          <div class="dropdown-option" @click="changeLanguage('zh')">
            普通話 🇨🇳
          </div>
          <div class="dropdown-option" @click="changeLanguage('fi')">
            Suomalainen 🇫🇮
          </div>
        </div>
      </div>
      <h1>{{ t("buttons.register") }}</h1>
      <form @submit.prevent="handleregister">
        <div class="form-group">
          <label for="username">{{ t("words.username") }}</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            :placeholder="t('buttons.usernamePlaceholder')"
          />
        </div>
        <div class="form-group">
          <label for="email">{{ t("words.email") }}</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            :placeholder="t('buttons.emailPlaceholder')"
          />
        </div>
        <div class="form-group">
          <label for="password">{{ t("words.password") }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            :placeholder="t('buttons.passwordPlaceholder')"
          />
        </div>
        <button id="RegisterButton" type="submit">
          {{ t("buttons.register") }}
        </button>
        <button id="LoginButton" type="button" @click="RouteToLogin">
          {{ t("buttons.login") }}
        </button>
        <p v-if="errorMessage" style="color: red; margin-bottom: 10px">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
#globe-dropdown-container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

#globe-button {
  background-color: #8ac379;
  border: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

#globe-icon {
  width: 25px;
  height: 25px;
}

#globe-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #8ac379;
  border: none;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
}

.dropdown-option {
  padding: 8px 12px;
  cursor: pointer;
  color: rgb(3, 3, 3);
  font-size: 14px;
  text-align: left;
}

.dropdown-option:hover {
  background-color: #7ab06b;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-view {
  width: 100%;
  max-width: 400px;
  background-color: #8ac379;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 1rem;
  color: black;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

#RegisterButton {
  width: 100%;
  padding: 10px;
  background-color: #282c34;
  color: #8ac379;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#LoginButton {
  width: 100%;
  padding: 10px;
  background-color: #8ac379;
  color: #282c34;
  font-size: 1rem;
  border: 4px solid #282c34;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #282c34;
}
#back-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
#backbutton {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #8ac379;
  border: none;
  border-radius: 10px;
  height: 50px;
  width: 50px;
}
</style>
