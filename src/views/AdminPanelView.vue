<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { isloggedin, userdata, rolemod, roleadmin, roleuser, deleteuser, getallusers } from "@/api/routes/userRoutes";

const router = useRouter();

const SearchQuery = ref("");

const users = ref({users: []});

async function handleRoleUser(userId) {
  await roleuser(userId)
  window.location.reload()
}

async function handleRoleAdmin(userId) {
  await roleadmin(userId)
  window.location.reload()
}

async function handleRoleMod(userId) {
  await rolemod(userId)
  window.location.reload()
}

async function handleDeleteUser(userId) {
  await deleteuser(userId)
  window.location.reload()
}
const filteredUsers = computed(() => 
  users.value.users.filter((user) =>
    user.Username.toLowerCase().includes(SearchQuery.value.toLowerCase())
  )
);

onMounted(async () => {
  const isLoggedIn = await isloggedin();
  if (isLoggedIn?.loggedin) {
    const userData = await userdata();
    if (userData.role !== "admin") {
      router.push("/");
    }
  }

  users.value = await getallusers()
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
            <td>{{ user.Username }}</td>
            <td>{{ user.UserRole }}</td>
            <td class="action-buttons">
              <button
                v-if="user.UserRole == 'user'"
                class="action-button"
                @click="handleRoleMod(user.UserDataId)"
              >
                Make Mod
              </button>
              <button
                v-if="user.UserRole == 'mod'"
                class="action-button"
                @click="handleRoleUser(user.UserDataId)"
              >
                Make User
              </button>
              <button
                v-if="user.UserRole !== 'admin'"
                class="action-button"
                @click="handleRoleAdmin(user.UserDataId)"
              >
                Make Admin
              </button>
              <button
                v-if="user.UserRole !== 'admin'"
                class="action-button"
                @click="handleDeleteUser(user.UserDataId)"
              >
                Delete user
              </button>
              <h2 class="admin-role"v-if="user.UserRole=='admin'">ADMIN
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
  background-color: #1c1f24; 
}
</style>
