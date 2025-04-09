<template>
  <div class="page-container">
    <AppHeader ref="appHeaderRef" />
    <main class="main-content">
      <div class="cart-container">
        <h1 class="cart-title">My Cart</h1>
        
        <div v-if="cart && cart.items.length > 0" class="cart-items">
          <div v-for="(item, index) in cart.items" :key="index" class="cart-item">
            <div class="cart-item-details">
              <p class="cart-item-name">{{ item.ingredient.name }}</p>
              <div class="quantity-controls">
                <button 
                  @click="decrementQuantity(item.ingredient._id, item.quantity)" 
                  class="quantity-btn"
                  :disabled="item.quantity <= 1"
                  :class="{ 'disabled': item.quantity <= 1 }"
                >
                  <span class="quantity-icon">−</span>
                </button>
                <p class="cart-item-quantity">{{ item.quantity }}</p>
                <button 
                  @click="incrementQuantity(item.ingredient._id)" 
                  class="quantity-btn"
                >
                  <span class="quantity-icon">+</span>
                </button>
              </div>
              <p class="cart-item-price">Price per unit: {{ item.ingredient.price }}€</p>
              <p class="cart-item-total">Total: {{ (item.ingredient.price * item.quantity).toFixed(2) }}€</p>
            </div>
            <button @click="removeItem(item.ingredient._id)" class="remove-button">Remove</button>
          </div>
          <div class="cart-total">
            <p class="cart-total-text">Total: <span class="total-price">{{ calculateTotal() }}€</span></p>
          </div>
        </div>
        
        <div v-else class="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AppHeader from './AppHeader.vue';
import '../style.css';
import config from '../config.js';

const cart = ref<any>(null);
const appHeaderRef = ref();

const updateHeaderCount = () => {
  if (appHeaderRef.value) {
    appHeaderRef.value.fetchCartCount();
  }
};

const incrementQuantity = async (ingredientId: string) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${config.apiBaseURL}/api/cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientId: ingredientId,
        quantity: 1
      }),
    });

    if (!response.ok) {
      throw new Error('Error updating quantity');
    }

    await fetchCart();
    updateHeaderCount();
  } catch (error) {
    console.error('Error incrementing quantity:', error);
  }
};

const decrementQuantity = async (ingredientId: string, currentQuantity: number) => {
  if (currentQuantity <= 1) return;

  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${config.apiBaseURL}/api/cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientId: ingredientId,
        quantity: -1
      }),
    });

    if (!response.ok) {
      throw new Error('Error updating quantity');
    }

    await fetchCart();
    updateHeaderCount();
  } catch (error) {
    console.error('Error decrementing quantity:', error);
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
    
    await fetchCart();
    updateHeaderCount();
  } catch (error) {
    console.error('Error removing the item:', error);
  }
};

const calculateTotal = () => {
  if (!cart.value || !cart.value.items) return "0.00";
  const total = cart.value.items.reduce((sum, item) => {
    return sum + (item.ingredient.price * item.quantity);
  }, 0);
  return total.toFixed(2);
};

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

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
.page-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: var(#5c6bc0);
}

.cart-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
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
  background-color: var(--background-light);  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
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
  color: black;
  font-size: 1.6rem;
}

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text-light);
}

.cart-item-total {
  font-size: 1.1rem;
  color: var(--primary-color);
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-btn {
  width: 25px;
  height: 25px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  border-radius: 4px;
}

.quantity-btn:hover:not(:disabled) {
  background-color: var(--secondary-color);
}

.quantity-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.quantity-icon {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.cart-item-quantity {
  font-size: 1.1rem;
  color: var(--text-light);
  min-width: 25px;
  text-align: center;
}
</style>
  