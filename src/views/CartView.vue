<script setup lang="ts">
import CartList from '../components/cart/CartList.vue'
</script>
<template>
  <div class="cart">
    <CartList />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .cart {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
