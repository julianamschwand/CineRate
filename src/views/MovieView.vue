<template>
  <div class="movie-view">
    <div class="movie-header">
      <h1 class="titel">movie</h1>
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
        <li v-for="(comment, index) in comments" :key="index">
          <strong>{{ comment.username }}:</strong> {{ comment.text }}
        </li>
      </ul>
      <textarea
        v-model="newComment"
        placeholder="Add a comment"
        :disabled="!isLoggedIn"
      ></textarea>
      <button @click="handleCommentSubmit" :disabled="!isLoggedIn">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      newComment: "",
    };
  },
  methods: {
    handleCommentSubmit() {
      alert("Please log in to add a comment.");
    },
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment.trim());
        this.newComment = "";
      }
    },
  },
};
</script>

<style scoped>
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
  color: #ccc;
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
.movie-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.movie-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
}
.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
}
.movie-container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
}
.movie-poster {
  width: 300px;
  height: 450px;
  background-color: #8ac379;
  border-radius: 10px;
  overflow: hidden;
}
.movie-details {
  width: 60%;
  padding: 20px;
  background-color: #8ac379;
  border-radius: 10px;
}

.comments-section {
  width: 80%;
  margin-top: 20px;
}
.comments-section h3 {
  margin-bottom: 10px;
}
.comments-section ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 10px;
}
.comments-section textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc;
}
.comments-section button {
  background-color: #8ac379;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
