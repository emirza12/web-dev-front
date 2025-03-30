<script lang="ts" setup>
import router from '../handlers/index.js';
import '../style.css';

function logout() {
  localStorage.removeItem('authToken');
  router.push('/signin');
}
</script>

<template>
    <div class="container">
      <div class="card">
        <h1>Welcome!</h1>
        <p>You are now successfully connected to your account.</p>
        <button @click="logout" class="button">Logout</button>
      </div>
    </div>
  </template>