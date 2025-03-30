<script lang="ts" setup>
import { ref } from 'vue'
import { postJSON } from '../api-client/api-client';
import config from '../config.js';
import router from '../handlers/index.js';
import '../style.css';

const username = ref('')
const password = ref('')
const email = ref('')

async function onSubmit(e: Event) {
    try {
        await postJSON(`${config.apiBaseURL}/api/users`, {
            username: username.value,
            email: email.value,
            password: password.value,
        });
        router.push('/signin');
    } catch (error) {
        console.error("Error during registration:", error);
    }
}
</script>

<template>
    <div class="container">
      <div class="card">
        <h1>Sign Up</h1>
        <form id="signup" @submit.prevent="onSubmit($event)">
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="Username" 
          />
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Email" 
          />
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Password" 
          />
          <input type="submit" value="Sign Up" />
        </form>
        <p class="signin-link">
          Already have an account? <router-link to="/signin">Connect here</router-link>
        </p>
      </div>
    </div>
  </template>
  