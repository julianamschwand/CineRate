<script setup>
import { ref, computed } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n(); 

const movies = ref([
  {
    id: 1,
    title: "Avengers: Infinity War",
    playtime: "2h 29m",
    year: "2018",
    cover:
      "src/assets/images/movie_covers/51HUrY93cwL._AC_UF1000,1000_QL80__jpg.png",
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    playtime: "3h 2m",
    year: "2019",
    cover: "src/assets/images/movie_covers/91-UCbbhoiL_jpg.png",
  },
  {
    id: 3,
    title: "Cover",
    playtime: "2h 10m",
    year: "2021",
    cover:
      "src/assets/images/movie_covers/bcc68be4-eede-409b-a63d-e179b28d19b4_jpg.png",
  },
  {
    id: 4,
    title: "Black Panther",
    playtime: "2h 15m",
    year: "2018",
    cover: "src/assets/images/movie_covers/images.png",
  },
  {
    id: 5,
    title: "Iron Man 2",
    playtime: "2h 4m",
    year: "2010",
    cover: "src/assets/images/movie_covers/iron_man_two_ver6_jpg.png",
  },
  {
    id: 6,
    title: "Guardians of the Galaxy",
    playtime: "2h 1m",
    year: "2014",
    cover:
      "src/assets/images/movie_covers/marvel-guardians-of-the-galaxy-61x91.5cm-movie-poster-37728-1-p_jpg.png",
  },
  {
    id: 7,
    title: "Lorem Ipsum",
    playtime: "1h 30m",
    year: "2021",
    cover:
      "src/assets/images/movie_covers/movie-poster-design-template_841014-16988_jpg.png",
  },
  {
    id: 8,
    title: "Smile",
    playtime: "1h 45m",
    year: "2021",
    cover: "src/assets/images/movie_covers/s-l400_jpg.png",
  },
  {
    id: 9,
    title: "Avengers: Infinity War",
    playtime: "2h 29m",
    year: "2018",
    cover:
      "src/assets/images/movie_covers/51HUrY93cwL._AC_UF1000,1000_QL80__jpg.png",
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    playtime: "3h 2m",
    year: "2019",
    cover: "src/assets/images/movie_covers/91-UCbbhoiL_jpg.png",
  },
  {
    id: 11,
    title: "Cover",
    playtime: "2h 10m",
    year: "2021",
    cover:
      "src/assets/images/movie_covers/bcc68be4-eede-409b-a63d-e179b28d19b4_jpg.png",
  },
  {
    id: 12,
    title: "Black Panther",
    playtime: "2h 15m",
    year: "2018",
    cover: "src/assets/images/movie_covers/images.png",
  },
  {
    id: 13,
    title: "Iron Man 2",
    playtime: "2h 4m",
    year: "2010",
    cover: "src/assets/images/movie_covers/iron_man_two_ver6_jpg.png",
  },
  {
    id: 14,
    title: "Guardians of the Galaxy",
    playtime: "2h 1m",
    year: "2014",
    cover:
      "src/assets/images/movie_covers/marvel-guardians-of-the-galaxy-61x91.5cm-movie-poster-37728-1-p_jpg.png",
  },
  {
    id: 15,
    title: "Lorem Ipsum",
    playtime: "1h 30m",
    year: "2021",
    cover:
      "src/assets/images/movie_covers/movie-poster-design-template_841014-16988_jpg.png",
  },
  {
    id: 16,
    title: "Smile",
    playtime: "1h 45m",
    year: "2021",
    cover: "src/assets/images/movie_covers/s-l400_jpg.png",
  },
]);
const SearchQuery = ref("");
const filteredMovies = computed(() => {
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(SearchQuery.value.toLowerCase())
  );
});
const isLoggedIn = ref(false);
const isDropdownVisible = ref(false);

function toggleLogin() {
  if (!isLoggedIn.value) {
    window.location.href = "/login";
  } else {
    isLoggedIn.value = false;
  }
}

function toggleDropdown() {
  isDropdownVisible.value = !isDropdownVisible.value;
}

function changeLanguage(lang) {
  locale.value = lang;
  isDropdownVisible.value = false; // Hide the dropdown after selection
}

</script>
<template>
  <div id="action-bar">
    <button id="add-button" @click="addMovie">
      <img src="@/assets/images/icons/PlusIcon.svg" id="add-button-plus" />
      {{ t('buttons.addMovie') }}
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
      <button id="login-button" @click="toggleLogin">
        {{ isLoggedIn ? t('buttons.logout') : t('buttons.login') }}
      </button>

    </div>
  </div>
  <div id="movie-grid" v-if="filteredMovies.length > 0">
    <MovieCard
      v-for="movie in filteredMovies"
      :key="movie.id"
      :movie="{ ...movie, title: t(`movies.${movie.title}`) }"
    />
  </div>
  <div v-else>
    <h1>{{ t('nmc.nmc0') }} "{{ SearchQuery }}" {{ t('nmc.found') }}</h1>
  </div>
</template>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
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

#action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

#login-button,
#register-button {
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

#globe-dropdown-container {
  position: relative;
}

#globe-dropdown {
  position: absolute;
  top: 100%; /* Position the dropdown below the button */
  left: -50%;
  background-color: #8ac379;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000; /* Ensure it appears in the foreground */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 120px;
}

.dropdown-option {
  padding: 8px 12px;
  cursor: pointer;
  color: #20242a;
  font-size: 14px;
  gap:0px;
}


#register-button {
  margin-left: 10px;
}
#login-button:hover,
#register-button:hover {
  background-color: #8ac379;
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
  margin-right: 10px;
}

#globe-icon {
  width: 25px;
  height: 25px;
}

div h1 {
  color:white;
}
</style>
