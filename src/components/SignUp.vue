<script lang="ts" setup>
import {ref} from 'vue'
import BasicInput from './BasicInput.vue';
import { postJSON } from '../api-client/api-client';
import config from '../config.js';
import router from '../handlers/index.js';


const username = ref('')
const password = ref('')
const email = ref('')

async function onSubmit(e:Event){
    try {
        await postJSON(`${config.apiBaseURL}/api/users`, {
            username : username.value,
            email : email.value,
            password : password.value,
        });
        router.push('/signin');
    } catch (error) {
        console.error("Error during registration:", error);
    }
}

</script>

<template>
    <form id="signup"
    @submit.prevent="onSubmit($event)">
        <fieldset>
            <legend>Please fill in the form</legend>
            <BasicInput 
                id = "username"
                type = "text"
                label = "Username"
                v-model = "username"
            />
            <BasicInput 
                id = "Email"
                type = "email"
                label = "email"
                v-model = "email"
            />
            <BasicInput 
                id = "password"
                type = "password"
                label = "Password"
                v-model = "password"
            />
            <input type="submit" value="Sign Up">
        </fieldset>
    </form>
</template>
