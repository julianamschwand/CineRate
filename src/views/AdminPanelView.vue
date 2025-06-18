<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { isloggedin, userdata } from "@/api/routes/userRoutes";

const { t } = useI18n();
const router = useRouter();

const SearchQuery = ref("");

const users = ref([
  { username: "Pascal", role: "user" },
  { username: "julian", role: "admin" },
  { username: "gregoir", role: "user" },
  { username: "fdsa", role: "user" },
  { username: "ron", role: "mod" }
]);

// Placeholder functions
function makeMod(username) {
  console.log(`Make ${username} mod`);
}
function banthatmf(username) {
  console.log(`Ban ${username}`);
}
function makeAdmin(username) {
  console.log(`Make ${username} admin`);
}

const filteredUsers = computed(() =>
  users.value.filter((user) =>
    user.username.toLowerCase().includes(SearchQuery.value.toLowerCase())
  )
);

onMounted(async () => {
  try {
    const isLoggedIn = await isloggedin();
    if (isLoggedIn?.loggedin) {
      const userData = await userdata();
      if (userData.role !== "admin" && userData.role !== "mod") {
        router.push("/");
      }
    }
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <button class="back-button" @click="router.push('/')">
    <img src="@/assets/images/icons/BackIcon.svg" class="back-icon" />
  </button>

  <div class="admin-container">
    <div class="search-wrapper">
      <div id="search-bar-container">
        <img src="@/assets/images/icons/SearchIcon.svg" id="search-icon" />
        <input
          type="text"
          id="search-bar"
          :placeholder="'Search for User...'"
          v-model="SearchQuery"
        />
      </div>
    </div>

    <div class="admin-panel">
      <table class="user-table">
        <thead>
          <tr class="list-header">
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="list-body" v-for="user in filteredUsers" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td class="action-buttons">
              <button
                v-if="user.role == 'user'"
                class="action-button"
                @click="handleRoleMod(user.username)"
              >
                Make Mod
              </button>
              <button
                v-if="user.role == 'mod'"
                class="action-button"
                @click="handleRoleUser(user.username)"
              >
                Make User
              </button>
              <button
                v-if="user.role !== 'admin'"
                class="action-button"
                @click="handleRoleAdmin(user.username)"
              >
                Make Admin
              </button>
              <button
                v-if="user.role !== 'admin'"
                class="action-button"
                @click="handleDeleteUser(user.username)"
              >
                Delete user
              </button>
              <h2 class="admin-role"v-if="user.role=='admin'">mb
              </h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}
.admin-role{
    display: flex;
    width: 100%;
    justify-content: center;
}
.back-icon{
    width: 25px;
    height: 25px;
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
    justify-content: flex-end;
    max-width: 600px;
    align-items: center;
    background-color: #8ac379;
    padding: 5px;
    border-radius: 5px;
    max-height: 100%;
    right: 0px;
}

.search-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 100%;
}

#search-icon {
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-left: 5px;
}

.admin-panel {
    border-radius: 10px;
    overflow: hidden;
}

.user-table {
  width: 100%;
  text-align: center;
  color: white;
  border-collapse: separate;
  border-spacing: 0;
  border: none;
}
.list-header th {
  padding: 12px;
  background-color: #8ac379;
  color: #20242a;
  font-weight: bold;
  border: none;
}


.list-header th {
    padding: 12px;
}


.list-body td {
  padding: 12px;
  background-color: #20242a;
  border: none;
}
.action-buttons{
    display: flex;
    height: 100%;
    justify-content:space-between ;
}
.action-button {
    background-color: #8ac379;
    color: #20242a;
    font-weight: bold;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.action-button:hover {
    background-color: #76ab5d;
}

button {
    background-color: #8ac379;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
}
.user-table tbody tr:nth-child(even) td {
  background-color: #2d2d2d; 
}
</style>
