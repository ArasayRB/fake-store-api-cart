<script setup>
import useCategories from '../../composables/categories'
import { ref } from 'vue'
import { /*computed,*/ onMounted } from 'vue'

const { categories, getCategories } = useCategories()
const selectedCategory = ref('') // reference to search must be empty not null
onMounted(getCategories)
</script>
<template>
    <DropdownT v-model="selectedCategory" :options="categories" @change="$emit('filterByCategory',selectedCategory)" placeholder="Filter by Category" class="w-full md:w-14rem"/>
</template>