<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const RouteToRegister = () => {
  router.push("/register");
};
</script>
<template>
  <div class="container">
    <div class="login-view">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button id="LoginButton" type="submit">Login</button>
        <button id="RegisterButton" @click="RouteToRegister">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-view {
  width: 100%;
  max-width: 400px;
  background-color: #8ac379;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 1rem;
  color: black;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

#LoginButton {
  width: 100%;
  padding: 10px;
  background-color: #282c34;
  color: #8ac379;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#RegisterButton {
  width: 100%;
  padding: 10px;
  background-color: #8ac379;
  color: #282c34;
  font-size: 1rem;
  border: 4px solid #282c34;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  filter: brightness(1.1);
}
</style>
