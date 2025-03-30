<template>
    <div class="cart-container">
      <AppHeader />
      
      <h1 class="cart-title">My Cart</h1>
      
      <div v-if="cart && cart.items.length > 0" class="cart-items">
        <div v-for="(item, index) in cart.items" :key="index" class="cart-item">
          <div class="cart-item-details">
            <p class="cart-item-name">{{ item.ingredient.name }}</p>
            <p class="cart-item-quantity">Quantity: {{ item.quantity }}</p>
            <p class="cart-item-price">{{ item.price }}€</p>
          </div>
          <button @click="removeItem(item.ingredient._id)" class="remove-button">Remove</button>
          <hr />
        </div>
        <div class="cart-total">
          <p class="cart-total-text">Total: <span class="total-price">{{ cart.totalPrice }}€</span></p>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import AppHeader from './AppHeader.vue';
  import '../style.css';
  import config from '../config.js';
  
  const cart = ref<any>(null);
  

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('authToken');  
      const response = await fetch(`${config.apiBaseURL}/api/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });  
      const data = await response.json();
      cart.value = data;
  
    } catch (error) {
      console.error('Error fetching the cart:', error);
    }
  };
  

  const removeItem = async (ingredientId: string) => {
    try {
      const token = localStorage.getItem('authToken');  
      const response = await fetch(`${config.apiBaseURL}/api/cart`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredientId }),
      });
      fetchCart();
  
    } catch (error) {
      console.error('Error removing the item:', error);
    }
  };
  
  onMounted(() => {
    fetchCart();
  });
  </script>
  
  <style scoped>

  .cart-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 40px;
    background-color: var(--background-light);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .cart-title {
    text-align: center;
    font-size: 2.5rem; 
    margin-bottom: 30px;
    color: var(--text-light);
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px; 
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: var(--background-dark);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item-details {
    display: flex;
    flex-direction: column;
    gap: 10px; 
  }
  
  .cart-item-name {
    font-size: 1.4rem; 
    font-weight: bold;
    color: var(--text-light); 
  }
  
  .cart-item-quantity,
  .cart-item-price {
    font-size: 1rem;
    color: var(--text-light); 
  }
  

  .remove-button {
  padding: 12px 20px; 
  margin-left: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: var(--secondary-color);
}

  

  .cart-total {
    margin-top: 30px;
    text-align: right;
  }
  
  .cart-total-text {
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--text-light);
  }
  
  .total-price {
    color: var(--primary-color);
    font-size: 1.6rem;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 1.5rem;
    color: var(--text-light);
  }
  </style>
  