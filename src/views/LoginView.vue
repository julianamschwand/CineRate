<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { login, userdata } from "@/api/routes/userRoutes";
import { ref } from "vue";

const router = useRouter();
const { locale, t } = useI18n();

const isDropdownVisible = ref(false);
const globeclasses = ref("globe-button");

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  globeclasses.value = isDropdownVisible.value
    ? "globe-button globe-dropdown-visible"
    : "globe-button";
};

const changeLanguage = (lang) => {
  locale.value = lang;
  toggleDropdown();
};

const RouteToRegister = () => {
  router.push("/register");
};

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    const result = await login(email.value, password.value);
    const user = await userdata();

    if (user?.id) {
      console.log("Eingeloggt als:", user);
      router.push("/");
    } else {
      errorMessage.value =
        "Login fehlgeschlagen. Bitte überprüfe deine Eingaben.";
      console.log(document.cookie);
    }
  } catch (error) {
    console.log("Fehler beim Login:", error);
    errorMessage.value = "Serverfehler oder ungültige Anmeldedaten.";
  }
  console.log("SessionId Cookie:", document.cookie);
};
</script>

<template>
  <div class="container">
    <div class="login-view">
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
        <button :class="globeclasses" @click="toggleDropdown">
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
      <h1>{{ t("buttons.login") }}</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">{{ t("words.email") }}</label>
          <input
            type="email"
            id="email"
            required
            :placeholder="t('buttons.emailPlaceholder')"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">{{ t("words.password") }}</label>
          <input
            type="password"
            id="password"
            required
            :placeholder="t('buttons.passwordPlaceholder')"
            v-model="password"
          />
        </div>
        <p v-if="errorMessage" style="color: red; margin-bottom: 10px">
          {{ errorMessage }}
        </p>
        <button id="LoginButton" type="submit">{{ t("buttons.login") }}</button>
        <button id="RegisterButton" type="button" @click="RouteToRegister">
          {{ t("buttons.register") }}
        </button>
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

.globe-button {
  background-color: #8ac379;
  border: none;
  padding: 8px;
  border-radius: 10px;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
}

.globe-dropdown-visible {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
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
  border-top-right-radius: 0px;
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
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-view {
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
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #333;
  box-sizing: border-box;
  color: white;
}

#LoginButton {
  width: 100%;
  padding: 10px;
  background-color: #282c34;
  color: #8ac379;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#RegisterButton {
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
