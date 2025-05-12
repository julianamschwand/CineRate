<script setup>
import router from "@/router";
import { ref } from "vue";

const newComment = ref("");
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

const RouteToHome = () => {
  router.push("/");
};

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
      <button id="home-button" type="button" @click="RouteToHome">←</button>
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
              v-if="!isadmin || comment.username == username"
              @click="deleteComment(CommentId)"
              class="delete-comment-button"
            >
              <img
                class="delete-comment-icon"
                src="@/assets/images/icons/delete-button.svg"
                alt="Delete Comment"
              />
            </button>
          
          </div>
          <div class="comment">{{ comment.Content }}</div>
        </li>
      </ul>

      <textarea
        v-model="newComment"
        placeholder="Add a comment"
        :disabled="!isLoggedIn"
      ></textarea>
      <button
        @click="handleCommentSubmit"
        :disabled="isLoggedIn"
        class="submit-button"
      >
        Submit
      </button>
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
  list-style-type: none;
  padding: 10px;
  margin-bottom: 15px;
}
li {
  padding-bottom: 50px;
}
img.delete-comment-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.comment {
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
.delete-comment-button:hover {
  background-color: red;
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

</style>
