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
</script>

<template>
  <div id="action-bar">
    <button id="add-button">
      <img src="@/assets/images/icons/PlusIcon.svg" id="add-button-plus" />
      {{ t("addMovie") }}
    </button>
    <div id="search-bar-container">
      <img src="@/assets/images/icons/SearchIcon.svg" id="search-icon" />
      <input
        type="text"
        id="search-bar"
        :placeholder="t('searchPlaceholder')"
        v-model="SearchQuery"
      />
    </div>
    <button id="add-button">{{ t("login") }}</button>
  </div>
  <div id="movie-grid" v-if="filteredMovies.length > 0">
    <MovieCard v-for="movie in filteredMovies" :movie="movie" />
  </div>
  <div v-else>
    <h1>{{ t("noMoviesFound", { SearchQuery }) }}</h1>
  </div>
</template>

<style scoped>
#add-button {
  background-color: #8ac379;
  border: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #20242a;
  height: 50px;
  font-weight: bold;
}

#add-button:active {
  background-color: #6f9e3f;
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
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Responsive columns */
  gap: 16px;
}
</style>
