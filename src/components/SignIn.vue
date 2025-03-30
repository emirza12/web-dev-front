
<script lang="ts" setup>
import {ref} from 'vue'
import BasicInput from './BasicInput.vue';
import { postJSON } from '../api-client/api-client';
import config from '../config.js';
import router from '../handlers/index.js';

const username = ref('')
const password = ref('')


async function onSubmit(e:Event){
    try {
        await postJSON(`${config.apiBaseURL}/api/token`, {
        username : username.value,
        password : password.value,
    })
        router.push('/connected');
    } catch (error) {
        console.error("Error during connection:", error);
    }
}

</script>

<template>
    <form id="login"
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
                id = "password"
                type = "password"
                label = "Password"
                v-model = "password"
            />
            <input type="submit" value="Log in">
        </fieldset>
    </form>
</template>