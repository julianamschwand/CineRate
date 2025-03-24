<template>
    <div class="movie-view">
        <div class="movie-header">
            <h1 class="titel">movie</h1>
            <div class="rating-section">
                <label for="rating">Rate the Trailer:</label>
                <select id="rating">
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>
            </div>
        </div>
        <div class="movie-trailer">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VIDEO_ID"
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
                <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
            </ul>
            <textarea v-model="newComment" placeholder="Add a comment"></textarea>
            <button @click="addComment">Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comments: [],
            newComment: ''
        };
    },
    methods: {
        addComment() {
            if (this.newComment.trim()) {
                this.comments.push(this.newComment.trim());
                this.newComment = '';
            }
        }
    }
};
</script>

<style scoped>
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
