<script lang="ts" setup>
import router from '../handlers/index.js';

function logout() {
  localStorage.removeItem('authToken');
  router.push('/signin');
}
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-card">
      <h1>Welcome!</h1>
      <p>You are now successfully connected to your account.</p>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #121212;
}

.welcome-card {
    background-color: #1c1c1c;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 3rem;
    width: 100%;
    max-width: 380px;
    text-align: center;
}

h1 {
    font-size: 2rem;
    color: #f3f4f6;
    margin-bottom: 1rem;
    font-weight: 700;
}

p {
    font-size: 1.1rem;
    color: #f3f4f6;
    margin-bottom: 2rem;
}

.logout-button {
    width: 100%;
    padding: 16px;
    background-color: #5c6bc0;
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #3f4f8b;
}
</style>
