<script setup lang="ts">
import ProductList from '../components/products/ProductList.vue'
</script>

<template>
  <div class="product">
    <ProductList />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .product {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
