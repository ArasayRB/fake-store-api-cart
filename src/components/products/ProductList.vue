<script setup>
import useProducts from '../../composables/products'
import { ref, watch } from 'vue'
import { /*computed,*/ onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import SearchBar from './SearchBar.vue'
import CategoryList from './CategoryList.vue'

const { products, getProducts, getProductsByCategory } = useProducts()
const searchQuery = ref('') // reference to search must be empty not null
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
console.log('Data', products)
onMounted(getProducts)



/** this function is called when click is pressed on search ButtonT, get the values from the api */
const doFilter = (selectedCategory) => {
  console.log('Selected Category',selectedCategory)
  getProductsByCategory(selectedCategory)
}
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const doClear = async () => {
  searchQuery.value = ''
  await getProducts()
}
</script>
<template>
  <div>    
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="products"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        :globalFilterFields="['title']"
      >
        <template #paginatorstart>
          <ButtonT type="button" icon="pi pi-refresh" text @click="doClear" />
        </template>
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-3 header-table">
            <span class="text-xl text-900 font-bold mt-1">List of Products</span>          
          <SearchBar :filters="filters" class="m-1"/>
          <CategoryList class="m-1" @filter-by-category="doFilter"/>
          </div>
        </template>
        <ColumnT field="title" header="Title"></ColumnT>
        <ColumnT field="category" header="Category"></ColumnT>
        <ColumnT field="description" header="Description"></ColumnT>
        <ColumnT field="rating.count" header="Quantity" style="width: 25%"></ColumnT>
        <ColumnT field="rating.rate" header="Reviews">
              <template #body="slotProps">
                  <RatingT :modelValue="slotProps.data.rating.rate" readonly :cancel="false" />
              </template>
        </ColumnT>
        <ColumnT field="image" header="Image">
          <template #body="slotProps">
            <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" style="width: 32px; position: relative; left: 45%;" />
          </template>
        </ColumnT>
        <ColumnT field="price" header="Price">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </ColumnT>
        <template #footer> In total there are {{ products ? products.length : 0 }} products. </template>
      </DataTable>
    </div>
  </div>
</template>
<style scoped>
  .header-table{
    display: flex;
  }
  .m-1{
    margin: 1%;
  }
  .mt-1{
    margin-top: 1.5%;
  }
</style>
