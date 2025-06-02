<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getlanguages } from "@/api/routes/languageRoutes";
import LanguageDropdown from "@/components/LanguageDropdown.vue";

const router = useRouter();
const { t } = useI18n();
const languages = ref([]);

onMounted(async () => {
  try {
    languages.value = await getlanguages();
    languages.value = languages.value.languages;
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>

<template>
  <div class="navbar">
    <button class="backbutton">
      <img
        src="@/assets/images/icons/BackIcon.svg"
        id="back-icon"
        @click="$router.push('/')"
      />
    </button>
    <LanguageDropdown />
  </div>
  <div class="Addmovie-container">
    <div class="contentcontainer">
      <div class="inputcontainer">
        <div class="titlecontainer">Title</div>
        <div v-for="l in languages" class="title-input">
          <p>{{ l.LanguageName + ":" }}</p>
          <input type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">Description</div>
        <div v-for="l in languages" class="title-input">
          <p>{{ l.LanguageName + ":" }}</p>
          <input type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">PlaybackID</div>
        <div class="title-input">
          <p>PlaybackId:</p>
          <input type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">Poster</div>
        <div class="title-input">
          <p>Poster:</p>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.contentcontainer {
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10%;
}

.Addmovie-container {
  display: flex;
  justify-content: left;
  align-items: left;
  height: 100vh;
}

.titlecontainer {
  background-color: #8ac379;
  padding: 10px;
  border-radius: 8px;
}
.inputcontainer {
  border: 2px solid #8ac379;
  background-color: #20242a;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 20px;
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
input {
  background-color: #20242a;
  border-color: #8ac379;
  border-radius: 5px;
  color: white;
  width: 100%;
  padding: 5px;
}

.title-input {
  color: white;
  padding: 10px;
  padding-right: 25px;
}
</style>
