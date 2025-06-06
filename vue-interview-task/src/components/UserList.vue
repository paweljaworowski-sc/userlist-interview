<template>
  <div class="section">
    <h2>User List</h2>
    <input :value="search" @input="event => search = event.target.value" placeholder="Search users" />

    <p>Total Detail Views: {{ totalViews }}</p>

    <div v-for="(user, index) in filtered" :key="index">
      <div
        v-if="user.role === 'admin'"
        :style="{ border: '2px solid darkred', padding: '10px', marginBottom: '8px' }"
      >
        <p><strong>👑[{{user.state}}] {{ user.name }} (Admin)</strong></p>
        <p>Age: {{ user.age }}</p>
        <button @click="toggle(user.id)">
          {{ toggleDetails[user.id] ? 'Hide' : 'Show' }} Admin Info
        </button>
        <p v-if="toggleDetails[user.id]" style="color: darkred">
          {{ user.details }}
        </p>
      </div>
      <div
        v-else
        :style="{ border: '1px solid black', padding: '10px', marginBottom: '8px' }"
      >
        <p><strong>[{{user.state}}] {{ user.name }}</strong></p>
        <p>Age: {{ user.age }}</p>
        <button @click="toggle(user.id)">
          {{ toggleDetails[user.id] ? 'Hide' : 'Show' }} Details
        </button>
        <p v-if="toggleDetails[user.id]">{{ user.details }}</p>
      </div>
    </div>
  </div>
  <div class="section add-user-form-section">
    <h4>Add user</h4>
    <form @submit.prevent="handleAddNewUser" class="add-user-form">
      <div class="form-row">
        <input type="text" v-model="newUserForm.name" placeholder="Name" required />
        <input type="number" v-model.number="newUserForm.age" placeholder="Age" />
      </div>
      <div class="form-row">
        <select v-model="newUserForm.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" v-model="newUserForm.details" placeholder="Details" />
      </div>
      <div class="btn-container">
        <button type="submit">Add New User</button>
        <button @click="saveChangesToParent" class="save-button" type="button">
          Save All Changes to Parent
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const props = defineProps({
  initialUsers: Array,
})

const users = ref([])
const search = ref("")
const filtered = ref([])
const toggleDetails = ref({})
const totalViews = ref(0)

onMounted(() => {
  users.value = props.initialUsers
  filtered.value = props.initialUsers
})

watchEffect(() => {
  filtered.value = users.value.filter(u => u.name.toLowerCase().includes(search.value.toLowerCase()))
})

const toggle = (id) => {
  const updated = { ...toggleDetails.value };
  const newShowState = !updated[id];
  updated[id] = newShowState;
  toggleDetails.value = updated;
  if (newShowState) {
    totalViews.value++;
  }
}

const newUserForm = ref({
  name: '',
  age: null,
  role: 'user',
  details: ''
});

const handleAddNewUser = () => {
  const newUser = {
    ...newUserForm.value,
    state: "Pending",
    id: Math.random(),
  };
  props.initialUsers.push(newUser)
  newUserForm.value = { name: '', age: null, role: 'user', details: '' };
};

const emit = defineEmits(['save-changes']);
const saveChangesToParent = () => {
  emit('save-changes', users.value);
};
</script>

<style>
.add-user-form {
  margin-bottom: 20px;
}
.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.section {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
}

.add-user-form-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.btn-container {
  display: flex;
  gap: 8px;
  flex-direction: column;
}
</style>