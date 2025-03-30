<script lang="ts" setup>
import router from '../handlers/index.js';

function logout() {
  localStorage.removeItem('authToken');
  router.push('/signin');
}
</script>

<template>
  <div>
    <h1>Welcome!</h1>
    <p>You are now successfully connected to your account.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

