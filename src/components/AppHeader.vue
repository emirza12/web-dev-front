<template>
    <header :class="{'header-logged-in': isLoggedIn, 'header-logged-out': !isLoggedIn}">
      <div class="container">
        <nav>
          <h1 v-if="!isLoggedIn">You can connect ! </h1>
        </nav>
      </div>
    </header>
  </template>
  
  <script lang="ts" setup>
  import { ref} from 'vue';
  const isLoggedIn = ref(!!localStorage.getItem('authToken'));
  
  </script>
  