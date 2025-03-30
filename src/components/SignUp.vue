<script lang="ts" setup>
import { ref } from 'vue'
import BasicInput from './BasicInput.vue';
import { postJSON } from '../api-client/api-client';
import config from '../config.js';
import router from '../handlers/index.js';

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
    <div class="signup-container">
        <div class="signup-card">
            <h1>Sign up</h1>
            <form id="signup" @submit.prevent="onSubmit($event)" class="signup-form">
                <BasicInput 
                    id="username"
                    type="text"
                    label="Username"
                    v-model="username"
                    class="input-field"
                />
                <BasicInput 
                    id="email"
                    type="email"
                    label="Email"
                    v-model="email"
                    class="input-field"
                />
                <BasicInput 
                    id="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    class="input-field"
                />
                <button type="submit" class="submit-button">Sign Up</button>
            </form>
            <p class="signin-link">
                Already have an account? <router-link to="/signin">Connect here</router-link>
            </p>
        </div>
    </div>
</template>

<style scoped>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #121212;
}

.signup-card {
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

.signup-form {
    margin-top: 2rem;
}

.input-field {
    width: 100%;
    padding: 14px;
    margin-bottom: 16px;
    border: 1px solid #444;
    border-radius: 8px;
    font-size: 1rem;
    color: #f3f4f6;
    background-color: #1a1a1a;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.input-field:focus {
    border-color: #5c6bc0;
    outline: none;
    background-color: #2a2a2a;
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

.signin-link {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #5c6bc0;
}

.signin-link a {
    color: #5c6bc0;
    text-decoration: none;
    font-weight: 500;
}

.signin-link a:hover {
    text-decoration: underline;
}
</style>
