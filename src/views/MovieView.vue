<script setup>
import { ref } from "vue";
const openedMenuId = ref(null);
const newComment = ref("");
const username = "AddiTestUser";
const isadmin = true;
const isLoggedIn = true;
const comments = ref([
  {
    CommentId: 1,
    Content: "Das isch dr best Film wo ich je gseh ha!",
    fk_UserDataId: 1,
    fk_MovieId: 1,
    username: "Luca",
  },
  {
    CommentId: 2,
    Content: "Ganz okay, aber d’Story het chli lahm gfange.",
    fk_UserDataId: 2,
    fk_MovieId: 1,
    username: "Mira",
  },
  {
    CommentId: 2,
    Content: "Ganz okay, aber d’Story het chli lahm gfange.",
    fk_UserDataId: 2,
    fk_MovieId: 1,
    username: "",
  },
  {
    CommentId: 3,
    Content: "Soundtrack 10/10, würd no mal luege!",
    fk_UserDataId: 3,
    fk_MovieId: 1,
    username: "Kevin",
  },
  {
    CommentId: 4,
    Content: "Mega Kamerafüehrig, aber dä Schluss het mi enttäuscht.",
    fk_UserDataId: 4,
    fk_MovieId: 1,
    username: "Sandra",
  },
  {
    CommentId: 5,
    Content: "Wägem Hauptcharakter han ich fast abgstellt 😅",
    fk_UserDataId: 5,
    fk_MovieId: 1,
    username: "Joel",
  },
]);
function toggleMenu(id, event) {
  const { clientX, clientY } = event;
  openedMenuId.value = id;
  menuPosition.value = {
    top: clientY + 10, // small offset down
    left: clientX + 10, // small offset right
  };
}

function handleCommentSubmit() {
  if (newComment.value.trim()) {
    comments.value.push({ username: username, text: newComment.value });
    newComment.value = "";
  }
}
function deleteComment(CommentId) {
  console.log("Deleting comment with CommentId:", CommentId);
  comments.value = comments.value.filter((_, i) => i !== CommentId);
}
</script>
<template>
  <div class="movie-view">
    <div class="movie-header">
      <h1 class="titel">titel</h1>
      <div class="rating-section">
        <div class="rate">
          <input type="radio" id="star5" name="rate" value="5" />
          <label for="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value="4" />
          <label for="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value="3" />
          <label for="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value="2" />
          <label for="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value="1" />
          <label for="star1" title="text">1 star</label>
        </div>
      </div>
    </div>
    <div class="movie-trailer">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/9bZkp7q19f0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="movie-container">
      <div class="movie-poster">
        <img src="https://via.placeholder.com/300" alt="Movie Poster" />
      </div>
      <div class="movie-details">
        <h2>Movie Title</h2>
        <p>Movie Description</p>
        <p>Movie Release Date</p>
        <p>Movie Rating</p>
      </div>
    </div>
    <div class="comments-section">
      <h3>Comments</h3>
      <ul>
        <li v-for="(comment, CommentId) in comments" :key="CommentId">
          <div class="creativeclassname">
            <strong>{{ comment.username }}:</strong>
            <button
              v-if="isadmin || comment.username === username"
              @click="(e) => toggleMenu(comment.CommentId, e)"
              class="meatballmenuopend"
            >
              <img
                class="meatballmenuimage"
                src="../assets/images/icons/meatballmenu.svg"
                alt="meatballmenu"
              />
            </button>

            <!--<div v-if="isMenuOpen(comment.CommentId)" class="delete-menu">
              <ul></ul>
              <button
                @click="deleteComment(comment.CommentId)"
                class="delete-comment-button"
              >
                <svg
                  class="delete-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    d="M135.2 17.7C140.1 7 150.5 0 162.3 0H285.7C297.5 0 307.9 7 312.8 17.7L324.5 44.8H432C440.8 44.8 448 52 448 60.8V76.8C448 85.6 440.8 92.8 432 92.8H416.2L389.7 467.7C388.6 488.8 371.2 505.6 350.1 505.6H97.9C76.8 505.6 59.4 488.8 58.3 467.7L31.8 92.8H16C7.2 92.8 0 85.6 0 76.8V60.8C0 52 7.2 44.8 16 44.8H123.5L135.2 17.7z"
                  />
                </svg>
                Delete
              </button>
            </div>-->
          </div>
          <div class="comment">{{ comment.Content }}</div>
        </li>
      </ul>

      <textarea
        v-model="newComment"
        placeholder="Add a comment"
        :disabled="!isLoggedIn || !isadmin"
      ></textarea>
      <button
        @click="handleCommentSubmit"
        :disabled="!isLoggedIn || !isadmin"
        class="submit-button"
      >
        Submit
      </button>
    </div>
    <div
      v-if="openedMenuId !== null"
      class="delete-menu"
      :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }"
    >
      <ul>
        <li>
          <button
            @click="deleteComment(openedMenuId)"
            class="delete-comment-button"
          >
            <svg
              class="delete-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                d="M135.2 17.7C140.1 7 150.5 0 162.3 0H285.7C297.5 0 307.9 7 312.8 17.7L324.5 44.8H432C440.8 44.8 448 52 448 60.8V76.8C448 85.6 440.8 92.8 432 92.8H416.2L389.7 467.7C388.6 488.8 371.2 505.6 350.1 505.6H97.9C76.8 505.6 59.4 488.8 58.3 467.7L31.8 92.8H16C7.2 92.8 0 85.6 0 76.8V60.8C0 52 7.2 44.8 16 44.8H123.5L135.2 17.7z"
              />
            </svg>
            Delete
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.movie-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #8ac379;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
}
.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #282c34;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
.titel {
  background-color: #8ac379;
  border-radius: 10px;
  padding: 8px;
  padding-right: 300px;
  width: 130px;
  cursor: pointer;
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
}
.movie-poster {
  width: 300px;
  height: 450px;
  background-color: #20242a;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 20px;
}
.movie-details {
  width: 100%;
  padding: 20px;
  background-color: #20242a;
  border-radius: 10px;
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

.comments-section textarea {
  flex: 1;
  height: 80px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #282c34;
  resize: vertical;
  font-family: inherit;
}

.submit-button {
  background-color: #8ac379;
  color: white;
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
  border: 1px solid #444;
  padding: 6px 10px;
  border-radius: 5px;
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
  position: relative;
}
</style>
