<script setup>

    const props= defineProps({
        filters:{
            required:true
        }
    })
</script>
<template>
  <div class="flex justify-content-end">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        v-model="filters['global'].value"
        placeholder="Search by Title"
      />
    </span>
  </div>
</template>
<style scoped>
.pi-search{
    top: 30%;
}
</style>
