<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getlanguages } from "@/api/routes/languageRoutes";
import { addmovie } from "@/api/routes/movieRoutes";
import LanguageDropdown from "@/components/LanguageDropdown.vue";

const router = useRouter();
const languages = ref([]);
const poster = ref(null);
const title = ref({});
const description = ref({});
const playbackid = ref("");
const releaseyear = ref("")
const duration = ref("")

onMounted(async () => {
  try {
    languages.value = await getlanguages();
    languages.value = languages.value.languages;

    for (const i of languages.value) {
      title.value[i.LanguageCode] = "";
      description.value[i.LanguageCode] = "";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function handleAddmovie() {
  try {
    const posterFile = poster.value.files[0] 
    title.value = Object.fromEntries(Object.entries(title.value).filter(([_, value]) => value.trim() !== ""));
    description.value = Object.fromEntries(Object.entries(description.value).filter(([_, value]) => value.trim() !== ""));

    await addmovie(title.value, description.value, posterFile, playbackid.value, releaseyear.value, duration.value);
    // router.push("/");
  } catch (err) {
    console.log("Error adding movie:", err);
  }
}
</script>

<template>
  <div class="navbar" @click="$router.push('/')">
    <button class="backbutton">
      <img
        src="@/assets/images/icons/BackIcon.svg"
        id="back-icon"
      />
    </button>
    <LanguageDropdown />
  </div>
  <div class="Addmovie-container">
    <div class="contentcontainer">
      <div class="inputcontainer">
        <div class="titlecontainer">Titel</div>
        <div v-for="l in languages" class="title-input">
          <p>{{ l.LanguageName + ":" }}</p>
          <input v-model="title[l.LanguageCode]" type="text"/>
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">Description</div>
        <div v-for="l in languages" class="title-input">
          <p>{{ l.LanguageName + ":" }}</p>
          <input v-model="description[l.LanguageCode]" type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">PlaybackID</div>
        <div class="title-input">
          <p>PlaybackId:</p>
          <input v-model="playbackid" type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">Release year</div>
        <div class="title-input">
          <p>Release year:</p>
          <input v-model="releaseyear" type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">Duration (in Min.)</div>
        <div class="title-input">
          <p>Duration:</p>
          <input v-model="duration" type="text" />
        </div>
      </div>
      <div class="inputcontainer">
        <div class="titlecontainer">Poster</div>
        <div class="title-input" >
          <p>Poster:</p>
          <input type="file" ref="poster" />
        </div>
      </div>
      <button class="submit-button" @click.prevent="handleAddmovie">Add Movie</button>
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
button {
  background-color: #8ac379;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
}
.Addmovie-container {
  display: flex;
  justify-content: left;
  align-items: left;
  height: 100%;
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

.submit-button {
  color:#20242a;
}
</style>
