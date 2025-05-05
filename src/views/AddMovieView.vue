<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getlanguages } from "@/api/routes/languageRoutes";

const router = useRouter();
const { locale, t } = useI18n();

const isDropdownVisible = ref(false);
const globeclasses = ref("globe-button");
const languageList = ref([])

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (isDropdownVisible.value) {
    globeclasses.value = "globe-button globe-dropdown-visible";
  } else {
    globeclasses.value = "globe-button";
  }
};

const changeLanguage = (lang) => {
  locale.value = lang;
  toggleDropdown();
};

const getLanguageList = async () => {
  const res = await getlanguages()
  
  if (res.success) {
    for (language in res.languages) {
      languageList.value.push(language.LanguageName)
    } 
  }
}

onMounted(async () => {
  getLanguageList()
})
</script>

<template>
  <div class="Addmovie-container">
    <div class="back-button">
      <button class="backbutton" id="backbutton">
        <img
          src="@/assets/images/icons/BackIcon.svg"
          id="back-icon"
          @click="$router.push('/')"
        />
      </button>
      <div id="globe-dropdown-container">
        <div></div>
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
    </div>
    <div class="contentcontainer">
      <div>Title</div>
      <div>Description</div>
      <div>PlaybackID</div>
      <div>Poster</div>
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
.contentcontainer {
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10%;
}
.contentcontainer div {
  list-style-type: none;
  padding: 20px;
  background-color: #282c34;
  border-radius: 10px;
}
.contentcontainer div {
  background-color: #8ac379;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: left;
  justify-content: left;
  transition: background-color 0.3s ease;
}
.Addmovie-container {
  display: flex;
  justify-content: left;
  align-items: left;
  height: 100vh;
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
