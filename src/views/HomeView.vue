<script setup>
import { ref, computed, onMounted } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import { useI18n } from "vue-i18n";
import { userdata } from "../../src/api/routes/userRoutes.js";
import { getmovies } from "../../src/api/routes/movieRoutes.js";
import { useRouter } from "vue-router"
import LanguageDropdown from "@/components/LanguageDropdown.vue";
const { locale, t } = useI18n();

const movies = ref([]);
const SearchQuery = ref("");

const isLoggedIn = ref(false);
const isAdmin = ref(false);
const isMod = ref(false);
const router = useRouter();

const toggleLogin = () => {
  if (!isLoggedIn.value) {
    router.push("/login");
  } else {
    isLoggedIn.value = false;
  }
};

const addMovie = () => {
  router.push("/addmovie");
};

const filteredMovies = computed(() => {
  return movies.value.filter((movie) =>
    movie.Title.toLowerCase().includes(SearchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    const user = await userdata();
    if (user) {
      isLoggedIn.value = true; // User is logged in
      isAdmin.value = user.isAdmin || false; // Check if the user is an admin
      isMod.value = user.isMod || false; // Check if the user is a mod
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  try {
    movies.value = await getmovies(locale.value);
    movies.value = movies.value.movies
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});
</script>
<template>
  <div class="navbar">
    <button v-if="isAdmin || !isMod" id="add-button" @click="addMovie">
      <img src="@/assets/images/icons/PlusIcon.svg" id="add-button-plus" />
      {{ t("buttons.addMovie") }}
    </button>
    <div id="search-bar-container">
      <img src="@/assets/images/icons/SearchIcon.svg" id="search-icon" />
      <input
        type="text"
        id="search-bar"
        :placeholder="t('buttons.searchPlaceholder')"
        v-model="SearchQuery"
      />
    </div>
    <div id="button-group">
      <LanguageDropdown/>
      <button id="login-button" @click="toggleLogin">
        {{ isLoggedIn ? t("buttons.logout") : t("buttons.login") }}
      </button>
    </div>
  </div>
  <div id="movie-grid" v-if="filteredMovies.length > 0">
    <MovieCard
      v-for="movie in filteredMovies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
  <div v-else>
    <h1>{{ t("nmc.nmc0") }} "{{ SearchQuery }}" {{ t("nmc.found") }}</h1>
  </div>
</template>
<style scoped>
html,
body {
  margin: 8px;
}
#add-button {
  background-color: #8ac379;
  border: none;
  border-radius: 10px;
  padding: 8px;
  width: 130px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #20242a;
  height: 50px;
  font-weight: bold;
}

#add-button-plus {
  height: 17px;
  margin-right: 5px;
}

#search-bar {
  padding: 10px;
  padding-right: 20svb;
  border: 1px solid #282c34;
  border-radius: 5px;
  display: inline-block;
  color: white;
  background-color: #20242a;
  max-height: 44px;
  margin: 3px;
}

#search-bar-container {
  display: inline-block;
  display: flex;
  align-items: center;
  background-color: #8ac379;
  padding: 5px;
  border-radius: 5px;
  max-height: 100%;
}

#search-icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  margin-left: 5px;
}

#movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

#button-group {
  display: flex;
  align-items: center;
}

#login-button {
  background-color: #8ac379;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

#login-button:hover {
  background-color: #8ac379;
}

div h1 {
  color: white;
}
</style>
