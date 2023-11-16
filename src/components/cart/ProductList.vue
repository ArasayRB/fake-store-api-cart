<script setup>
import useCartStore from '../../stores/cart'
import { ref } from 'vue'
import { /*computed,*/ onMounted } from 'vue'

const store = useCartStore();
const selectedCategory = ref('') // reference to search must be empty not null
onMounted(store.allProducts)
</script>
<template>
    <DropdownT v-model="selectedCategory" :options="store.products" optionLabel="title" 
    placeholder="Select Product" class="w-full md:w-14rem"
    @change="$emit('updateProductForm',selectedCategory)"/>
</template>