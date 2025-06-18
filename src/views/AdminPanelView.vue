<script setup>
import { rolemod } from '@/api/routes/userRoutes';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <button class="back-button" @click="router.push('/')">
    <img src="@/assets/images/icons/BackIcon.svg" class="back-icon" />
  </button>

  <div class="admin-panel">
    <h1 class="panel-title">Admin Panel</h1>
    <table class="user-table">
      <thead>
        <tr class="list-header">
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username" class="list-body">
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button
              v-if="user.role !== 'mod' && user.role !== 'admin'"
              class="make-mod-button"
              @click="rolemod(user.username)"
            >
              Make Mod
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-panel {
  background-color: #8ac379;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem;
  color: #20242a;
}

.panel-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.list-header {
  background-color: #8ac379;
  color: #20242a;
  font-weight: bold;
  height: 50px;
}

.list-header th {
  padding: 12px;
  border: 1px solid #20242a;
}

.list-body td {
  padding: 12px;
  border: 1px solid #20242a;
}

.make-mod-button {
  background-color: #8ac379;
  color: #20242a;
  font-weight: bold;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.make-mod-button:hover {
  background-color: #76ab5d;
}

.back-button {
  background-color: transparent;
  border: none;
  margin: 16px;
  cursor: pointer;
}

.back-icon {
  width: 32px;
  height: 32px;
}
</style>
