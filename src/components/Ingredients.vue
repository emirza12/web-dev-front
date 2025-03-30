<template>
  <AppHeader />
  <h1 style="text-align: center;">Welcome! You can now start shopping!</h1>
  <div class="container">
    <div class="ingredients-list">
      <h2>Available Ingredients</h2>
      <div class="ingredients-grid">
        <div 
          class="ingredient-card" 
          v-for="ingredient in ingredients" 
          :key="ingredient._id"
        >
          <h3>{{ ingredient.name }}</h3>
          <p>Category: {{ ingredient.category }}</p>
          <p>Price: {{ ingredient.price }} €/{{ ingredient.unit }}</p>
          <button @click="addToCart(ingredient._id)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import '../style.css';
import AppHeader from './AppHeader.vue';
import config from '../config.js';

const ingredients = ref([]);


async function fetchIngredients() {
  try {
    const response = await fetch(`${config.apiBaseURL}/api/ingredients`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    if (!response.ok) {
      throw new Error('Error fetching ingredients');
    }
    ingredients.value = await response.json();

  } catch (error) {
    console.error(error);
  }
}



async function addToCart(ingredientId) {
  const quantity = 1;

  try {
    const response = await fetch(`${config.apiBaseURL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        ingredientId: ingredientId,
        quantity: quantity,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error adding to cart:', errorResponse);
      throw new Error('Error adding to cart');
    }

    const cart = await response.json();
  } catch (error) {
    console.error(error);
  }
}


onMounted(() => {
  fetchIngredients();
});
</script>

<style scoped>
.container {
  padding: 20px;
  margin-top: 80px;
}

h1 {
  font-size: 2rem;
  color: var(--text-light);
  font-weight: bold;
}

.ingredients-list {
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 20px;
  font-weight: 700;
}

.ingredients-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  justify-content: space-around;
}

.ingredient-card {
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: var(--background-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 250px;
}

.ingredient-card h3 {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 10px;
}

.ingredient-card p {
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 8px;
}
</style>
