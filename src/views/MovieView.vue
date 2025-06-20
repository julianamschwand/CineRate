<script setup>
import router from "@/router";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { getmoviedata, deletemovie } from "@/api/routes/movieRoutes";
import { addcomment, editcomment, deletecomment, getcomments } from "@/api/routes/commentRoutes";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import { useI18n } from "vue-i18n";
import { isloggedin, userdata } from "@/api/routes/userRoutes";
import { getrating, rate, getuserrating } from "@/api/routes/ratingRoutes";

const { locale } = useI18n();
const route = useRoute();
const movieId = route.params.id;
const isLoggedIn = ref(false);
const openedMenuId = ref(null);
const newComment = ref("");
const menuPosition = ref({ top: 1000, left: 0 });
const isEditing = ref(false);
const editingCommentId = ref(null);
const movie = ref({})
const comments = ref([]);
const user = ref({});
const rating = ref({})
const selectedrating = ref(0)
const apiURL = import.meta.env.VITE_API_URL

const RouteToHome = () => {
  router.push("/");
};

function toggleMenu(id, event) {
  if (openedMenuId.value) {
    openedMenuId.value = null;
  } else {
    openedMenuId.value = id;
  }
  const rect = event.currentTarget.getBoundingClientRect();
  menuPosition.value = {
    top: rect.bottom + window.scrollY + 8,
    left: rect.left + window.scrollX + 50,
  };
}

async function submitRating() {
  await rate(movieId, selectedrating.value)
  rating.value = await getrating(movieId)
}

async function handleCommentSubmit() {
  const trimmed = newComment.value.trim();
  if (!trimmed) return;

  if (isEditing.value) {
    const comment = comments.value.find(
      (c) => c.CommentId === editingCommentId.value
    );
    if (!comment) {
      console.warn("Kommentar zum Bearbeiten nicht gefunden.");
      return;
    }

    try {
      await editcomment(comment.CommentId, trimmed);
      comment.Content = trimmed;
    } catch (error) {
      console.error("Fehler beim Bearbeiten:", error);
    }

    isEditing.value = false;
    editingCommentId.value = null;
  } else {
    try {
      await addcomment(movieId, trimmed);
      handleGetComments()
    } catch (error) {
      console.error("Fehler beim Erstellen:", error);
    }
  }

  newComment.value = "";
}

const currentComment = computed(() => {
  return comments.value.find((c) => c.CommentId === openedMenuId.value);
});

const handleDeleteMovie = async () => {
  try {
    await deletemovie(movieId);
    router.push("/");
  } catch (err) {
    console.error("Error deleting movie:", err);
  }
};

function editCommentById(commentId) {
  const comment = comments.value.find((c) => c.CommentId === commentId);
  if (!comment) {
    console.warn("Kommentar nicht gefunden für ID:", commentId);
    return;
  }
  newComment.value = comment.Content;
  isEditing.value = true;
  editingCommentId.value = commentId;
  openedMenuId.value = null;
}

async function deleteComment(commentId) {
	try {
		await deletecomment(commentId);
		comments.value = comments.value.filter((c) => c.CommentId !== commentId);
	} catch (error) {
		console.error("Fehler beim Löschen:", error);
	}
	openedMenuId.value = null;
}

async function handleGetComments() {
  const commentResponse = await getcomments(movieId);
  if (commentResponse?.comments) {
    comments.value = commentResponse.comments;
  } else {
    comments.value = [];
  }
} 

onMounted(async () => {
  isLoggedIn.value = await isloggedin()
  if (isLoggedIn.value?.loggedin) {
    user.value = await userdata();
    locale.value = user.value.selectedlanguage

    const userratingres = await getuserrating(movieId)
    selectedrating.value = userratingres.rating
  }
  
  const movieres = await getmoviedata(movieId, locale.value);
  movie.value = movieres.movie

  rating.value = await getrating(movieId)

  handleGetComments()
});
</script>
<template>
  <div class="navbar">
    <button class="backbutton" @click="RouteToHome">
      <img src="@/assets/images/icons/BackIcon.svg" class="back-icon" />
    </button>
    <div class="titlecontainer">
      <h2 class="title">{{ movie.Title }}</h2>
      <div class="rating-section">
        <div class="rate">
          <input type="radio" id="star5" name="rate" value="5" v-model="selectedrating" @change="submitRating"/>
          <label for="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value="4" v-model="selectedrating" @change="submitRating"/>
          <label for="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value="3" v-model="selectedrating" @change="submitRating"/>
          <label for="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value="2" v-model="selectedrating" @change="submitRating"/>
          <label for="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value="1" v-model="selectedrating" @change="submitRating"/>
          <label for="star1" title="text">1 star</label>
        </div>
      </div>
    </div>
    <LanguageDropdown />
  </div>
  <div class="movie-view">
    <div class="movie-trailer">
      <iframe :src="`https://www.youtube.com/embed/${movie.PlaybackId}`" title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div class="movie-container">
      <img :src="apiURL + movie.Poster" alt="Movie Poster" class="movie-poster"/>
      <div class="movie-details-container">
        <div class="movie-rating">
          <span class="rating-star">★</span>
          <span>{{ rating.rating == "No rating" ? rating.rating : "Rating: " + rating.rating}}</span>
        </div>
        <div class="movie-details">
          {{ movie.Description }}
        </div>
      </div>
    </div>
    <div v-if="user.role === 'admin'|| user.role ==='mod'"class="admin-controls">
      <button @click="router.push(`/editmovie/${movieId}`)">Edit Movie</button>
      <button @click="handleDeleteMovie">Delete Movie</button>
    </div>
    <div class="comments-section">
      <h3>Comments</h3>
      <ul>
        <li v-for="comment in comments" :key="comment.CommentId">
          <div class="creativeclassname">
            <strong>{{ comment.Username }}:</strong>
            <button v-if="user.role === 'admin' || comment.Username === user.username"
              @click="(e) => toggleMenu(comment.CommentId, e)" class="meatballmenuopend">
              <img class="meatballmenuimage" src="../assets/images/icons/meatballmenu.svg" alt="meatballmenu" />
            </button>
          </div>
          <div class="comment">{{ comment.Content }}</div>
        </li>
      </ul>

      <textarea v-model="newComment" placeholder="Add a comment" :disabled="!isLoggedIn" class="comment-input"></textarea>
      <button @click="handleCommentSubmit" :disabled="!isLoggedIn" class="submit-button">
        {{ isEditing ? "Update" : "Submit" }}
      </button>
    </div>
    <div v-if="openedMenuId !== null" class="delete-menu" :style="{
      top: menuPosition.top + 'px',
      left: menuPosition.left + 'px',
    }">
      <ul>
        <li>
          <button @click="deleteComment(openedMenuId)" class="delete-comment-button">
            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"
              fill="currentColor">
              <path
                d="M135.2 17.7C140.1 7 150.5 0 162.3 0H285.7C297.5 0 307.9 7 312.8 17.7L324.5 44.8H432C440.8 44.8 448 52 448 60.8V76.8C448 85.6 440.8 92.8 432 92.8H416.2L389.7 467.7C388.6 488.8 371.2 505.6 350.1 505.6H97.9C76.8 505.6 59.4 488.8 58.3 467.7L31.8 92.8H16C7.2 92.8 0 85.6 0 76.8V60.8C0 52 7.2 44.8 16 44.8H123.5L135.2 17.7z" />
            </svg>
            Delete
          </button>
          </li>
          <li>
          <button v-if="currentComment?.CommentUserId === user.id"
            @click="editCommentById(currentComment?.CommentId)" class="edit-comment-button">
            <svg class="edit-icon" fill="none" height="20" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.movie-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  box-sizing: border-box;
}

.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
}

.rate:not(:checked)>input {
  position: absolute;
  top: -9999px;
}

.rate:not(:checked)>label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #282c34;
}

.rate:not(:checked)>label:before {
  content: "★ ";
}

.rate>input:checked~label {
  color: #ffc700;
}

.rate:not(:checked)>label:hover,
.rate:not(:checked)>label:hover~label {
  color: #deb217;
}

.rate>input:checked+label:hover,
.rate>input:checked+label:hover~label,
.rate>input:checked~label:hover,
.rate>input:checked~label:hover~label,
.rate>label:hover~input:checked~label {
  color: #c59b08;
}

.titlecontainer {
  background-color: #8ac379;
  color: #20242a;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  max-height: 50px;
  align-items: center;
  width: 80%;
  padding-left: 10px;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.movie-container {
  display: flex;
  width: 100%;
  margin-top: 20px;
  height: 320px;
}

.movie-poster {
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-right: 20px;
  width: auto;
  display: inline-block;
}

.movie-details-container {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  color: white;
  width: 100%;
}

.movie-rating {
  background-color: #20242a;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  box-sizing: border-box;
  margin-bottom: 20px;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.rating-star {
  color: #ffc700;
}

.movie-details {
  background-color: #20242a;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  height: 250px;
}

.comments-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #20242a;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}

.comments-section h3 {
  margin-bottom: 15px;
  color: white;
}

.comments-section ul {
  overflow-y: auto;
  overflow-x: visible;
  height: 30rem;
  list-style-type: none;
  padding: 10px;
  margin-bottom: 15px;
  position: relative;
}

.comments-section ul::-webkit-scrollbar {
  width: 8px;
}

.comments-section ul::-webkit-scrollbar-track {
  background: #20242a;
  border-radius: 10px;
}

.comments-section ul::-webkit-scrollbar-thumb {
  background-color: #8ac379;
  border-radius: 10px;
  border: 2px solid #20242a;
}

.comments-section ul::-webkit-scrollbar-thumb:hover {
  background-color: #8ac379;
}

li {
  padding-bottom: 50px;
  position: relative;
  overflow: visible;
}

.comment {
  position: relative;
  background-color: #20242a;
  padding: 10px 15px;
  margin-bottom: 10px;
  color: white;
  border-radius: 5px;
  border: 1px solid #8ac379;
}

.comments-section li strong {
  color: white;
}

.comment-input-container {
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: flex-start;
}

.comment-input{
  flex: 1;
  height: 80px;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid #8ac379;
  background-color: #20242a;
  color: white;
  resize: vertical;
  font-family: inherit;
}

.comment-input:focus {
  outline: none;
}

.submit-button {
  background-color: #8ac379;
  color: #20242a;
  border: none;
  width: 10%;
  height: 10%;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 50px;
  margin-top: 10px;
}

.comment-section img {
  width: 20px;
  height: 20px;
}

.submit-button:hover {
  background-color: #76a968;
}

.delete-comment-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-menu {
  position: absolute;
  z-index: 9999;
  background-color: #2e2e2e;
  border: 1px solid #555;
  padding: 10px;
  border-radius: 10px;
  min-width: 150px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.2s ease-out;
}

.delete-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.delete-menu li {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.delete-menu button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background-color: transparent;
  color: white;
  transition: background-color 0.2s ease;
}

.delete-menu .delete-comment-button {
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.delete-menu button:hover {
  background-color: #444;
}
.delete-menu .delete-comment-button:hover .delete-icon {
  color: red;
}

.meatballmenuimage {
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.meatballmenuopend {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.creativeclassname {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

#home-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #8ac379;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  color: #282c34;
  font-size: 2rem;
  font-weight: bold;
  z-index: 1000;
}

#home-button:hover {
  filter: brightness(1.1);
}

.movie-trailer {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.movie-trailer iframe {
  height: 350px;
  width: 100%;
  display: block;
}

.admin-controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  gap: 10px;
}

.admin-controls button {
  color: #20242a;
  background-color: #8ac379;
  flex-grow: 1;
  border: none;
  border-radius: 10px;
  height: 40px;
  cursor: pointer;
}
</style>