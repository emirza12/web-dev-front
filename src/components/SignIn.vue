<script lang="ts" setup>
import { ref } from 'vue'
import { postJSON } from '../api-client/api-client';
import config from '../config.js';
import router from '../handlers/index.js';
import '../style.css';

const username = ref('')
const password = ref('')

async function onSubmit(e: Event) {
    try {
        const response = await postJSON(`${config.apiBaseURL}/api/token`, {
            username: username.value,
            password: password.value
        });

        const data = await response.json(); 

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            router.push('/ingredients');
        }
    } catch (error) {
        console.error("Error during connection:", error);
    }
}
</script>

<template>
    <div class="container">
      <div class="card">
        <h1>Sign In</h1>
        <form id="login" @submit.prevent="onSubmit($event)">
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Username"
          />
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
          />
          <input type="submit" value="Log In" />
        </form>
        <p class="signup-link">
          Don't have an account? <router-link to="/signup">Create one here</router-link>
        </p>
      </div>
    </div>
  </template>
  