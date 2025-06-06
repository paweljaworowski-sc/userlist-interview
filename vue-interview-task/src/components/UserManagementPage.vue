<template>
  <div class="user-list">
    <UserList :initialUsers="users" @save-changes="updateUserList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserList from './UserList.vue'

const users = ref([
    { id: 1, name: "Alice Johnson", age: 25, role: "admin", details: "Manages team", state: "Active" },
    { id: 2, name: "Alice Van Der Beek", age: 25, role: "user", details: "Frontend Developer", state: "Active" },
    { id: 3, name: "Bob Smith", age: 30, role: "user", details: "Backend Developer", state: "Active" },
    { id: 4, name: "Charlie Lee", age: 22, role: "user", details: "Intern", state: "Active" },
]);

const updateUserList = (newUsers) => {
  users.value = newUsers.map((u) => u.state = "Active");
};
</script>

<style>
.user-list {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
}
</style>