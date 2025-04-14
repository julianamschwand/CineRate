<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { locale, t } = useI18n();

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const changeLanguage = (lang) => {
  locale.value = lang;
  isDropdownVisible.value = false; // Close the dropdown after selection
};

const RouteToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="container">
    <div class="login-view">
      <div id="globe-dropdown-container">
        <button id="globe-button" @click="toggleDropdown">
          <img src="@/assets/images/icons/GlobeIcon.svg" id="globe-icon" />
        </button>
        <div v-if="isDropdownVisible" id="globe-dropdown">
          <div class="dropdown-option" @click="changeLanguage('en')">English 🇬🇧</div>
          <div class="dropdown-option" @click="changeLanguage('de')">Deutsch 🇩🇪</div>
          <div class="dropdown-option" @click="changeLanguage('it')">Italiano 🇮🇹</div>
          <div class="dropdown-option" @click="changeLanguage('sp')">Español 🇪🇸</div>
          <div class="dropdown-option" @click="changeLanguage('zh')">普通話 🇨🇳</div>
          <div class="dropdown-option" @click="changeLanguage('fi')">Suomalainen 🇫🇮</div>
        </div>
      </div>
      <h1>{{ t('buttons.login') }}</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">{{ t('words.email') }}</label>
          <input
            type="email"
            id="email"
            required
            :placeholder = "t('buttons.emailPlaceholder')" 
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">{{ t('words.password') }}</label>
          <input
            type="password"
            id="password"
            required
            :placeholder="t('buttons.passwordPlaceholder')"
            v-model="password"
          />
        </div>
        <button id="LoginButton" type="submit">{{ t('buttons.login') }}</button>
        <button id="RegisterButton" @click="RouteToRegister">{{ t('buttons.register') }}</button>
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
  margin: 0;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

button:hover {
  filter: brightness(1.1);
}
</style>
