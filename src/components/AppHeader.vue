<template>
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <!-- Liens à gauche -->
          <ul class="nav-list left">
            <li><router-link to="/ingredients">Ingredients</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
          </ul>
  
          <!-- Bouton Logout à droite -->
          <ul class="nav-list right">
            <li><button @click="logout" class="button">Logout</button></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script lang="ts" setup>
  import router from '../handlers/index.js';
  import '../style.css'; 
  
  function logout() {
    localStorage.removeItem('authToken');
    router.push('/signin');
  }
  </script>
  
  
  <style scoped>
.header {
  width: 100%;
  background-color: var(--background-light);
  padding: 20px 0;
  color: var(--text-light);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-list.left {
  flex: 1;
  justify-content: flex-start;
}

.nav-list.right {
  justify-content: flex-end;
  flex: 0;
  align-items: center; 
}

.nav-list li a {
  text-decoration: none;
  color: var(--text-light);
  font-weight: bold;
  transition: color 0.3s;
}

.nav-list li a:hover {
  color: var(--primary-color);
}

.button {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--secondary-color);
}

  </style>
  