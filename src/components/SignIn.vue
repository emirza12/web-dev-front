<script lang="ts" setup>
import { ref } from 'vue'
import BasicInput from './BasicInput.vue';
import { postJSON } from '../api-client/api-client';
import config from '../config.js';
import router from '../handlers/index.js';

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
            router.push('/connected');
        }
    } catch (error) {
        console.error("Error during connection:", error);
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <h1>Sign in</h1>
            <form id="login" @submit.prevent="onSubmit($event)" class="login-form">
                <BasicInput 
                    id="username"
                    type="text"
                    label="Username"
                    v-model="username"
                    class="input-field"
                />
                <BasicInput 
                    id="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    class="input-field"
                />
                <button type="submit" class="submit-button">Log In</button>
            </form>
            <p class="signup-link">
                Don't have an account? <router-link to="/signup">Create one here</router-link>
            </p>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #121212;
}

.login-card {
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
    margin-bottom: 2rem;
    font-weight: 700;
}

form {
    margin-top: 2rem;
}

.submit-button {
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

.submit-button:hover {
    background-color: #3f4f8b;
}

.signup-link {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #5c6bc0;
}

.signup-link a {
    color: #5c6bc0;
    text-decoration: none;
    font-weight: 500;
}

.signup-link a:hover {
    text-decoration: underline;
}
</style>
