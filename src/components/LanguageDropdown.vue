<script setup>
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n";
import { changeselectedlanguage, userdata } from "@/api/routes/userRoutes.js";
import { isloggedin } from "@/api/routes/userRoutes.js";
const { locale } = useI18n();

const isDropdownVisible = ref(false);

const globeclasses = ref("globe-button");

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (isDropdownVisible.value) {
    globeclasses.value = "globe-button globe-dropdown-visible";
  } else {
    globeclasses.value = "globe-button";
  }
};

const changeLanguage = async (lang) => {
  locale.value = lang;
  toggleDropdown();
  await changeselectedlanguage(lang)
  window.location.reload()
};
</script>
<template>
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
          <div class="dropdown-option" @click="changeLanguage('es')">
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
</template>
<style scoped>
#globe-dropdown-container {
  position: relative;
  display: flex;
  margin-right: 10px;
  height: 50px;
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
  min-height: 100%;
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
</style>