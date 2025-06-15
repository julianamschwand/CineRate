<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const apiURL = import.meta.env.VITE_API_URL
const props = defineProps(["movie"]);
</script>

<template>
  <div id="movie-card" @click="router.push(`/movie/${movie.MovieId}`)">
    <img :src="apiURL + movie.Poster" id="movie-cover" />
    <div id="movie-info">
      <div id="movie-details">
        <img src="@/assets/images/icons/YearIcon.svg" />
        <span>{{ movie.ReleaseYear }}</span>
        <img src="@/assets/images/icons/ClockIcon.svg" />
        <span>{{ movie.Duration + " min."}}</span>
      </div>
      <h2 id="movie-title">{{ movie.Title }}</h2>
    </div>
  </div>
</template>

<style scoped>
* {
  color: white;
}

/* Overall Movie Card */
#movie-card {
  display: grid;
  grid-template-rows: 300px 100px; /* 300px for cover; 100px for info */
  max-width: 200px;
  height: 400px; /* Fixed overall height */
  background-color: #20242a;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  user-select: none;
}

#movie-card:hover {
  transform: scale(1.03);
}

/* Cover Image */
#movie-cover {
  width: 100%;
  height: 300px; /* Matches the grid row height */
  object-fit: contain; /* Resizes the image to show the whole cover */
  border-radius: 10px;
  pointer-events: none;
}

/* Info Section */
#movie-info {
  display: grid;
  grid-template-rows: 40px 60px; /* 40px for details, 60px for title */
  width: 100%;
  margin-top: 10px;
}

/* Movie Details */
#movie-details {
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 40px; /* Fixed height */
}

#movie-details img {
  height: 14px;
  margin-right: 3px;
}

#movie-details span {
  margin-right: 10px;
}

/* Movie Title */
#movie-title {
  height: 60px; /* Fixed height */
  overflow: hidden;
  text-align: left;
  margin: 0;
  padding: 0;
  display: -webkit-box;
  display: box;
  line-clamp: 2;
  -webkit-line-clamp: 2; /* Allow up to 3 lines; adjust as needed */
  -webkit-box-orient: vertical;
  box-orient: vertical;
}
</style>
