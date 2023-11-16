<script setup>
import useCartStore from '../../stores/cart'
import { /*computed,*/ onMounted } from 'vue'
import { ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import ProductList from './ProductList.vue'
import Swal from 'sweetalert2'

const store = useCartStore();
const product = ref({})
const amount = ref(0)
const quantity = ref(1)
const price = ref(0)
const toast = useToast()
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const submitted = ref(false);
const selectedProducts = ref();
console.log('Data', store.carts,store.infoProd)
onMounted(store.getCarts)
const calculateAmount = (priceR) => {
    console.log('pr',price)
    price.value=priceR
    console.log('pr-after',price)
  }

  // getter
watch(
  () => price.value * quantity.value,
  (prod) => {
    amount.value=prod
    console.log(`prod of x * y is: ${prod}`)
  }
)
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

const confirmDeleteProduct = (prod) => {
  console.log('confirm before delete',prod)
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    store.productsCart = store.productsCart.filter(val => val.productId !== product.value.productId);
    deleteProductDialog.value = false;
    product.value = {};
    Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been deleted',
                showConfirmButton: false,
                timer: 1500
              });
};
const deleteSelectedProducts = () => {
    store.productsCart = store.productsCart.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

const saveProduct = async () => {
    submitted.value = true;

    if (product.value.title.trim()) { 
      
      let productToAdd = {
        productId:product.value.id,
        quantity:quantity.value
      }
      let index = store.productsCart.findIndex(product => product.productId === productToAdd.productId);
        if(index !== -1) {
              store.productsCart[index].quantity += quantity.value;
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been updated',
                showConfirmButton: false,
                timer: 1500
              });
        }else{
          
          let addToUser = {
            userId:4,
            date:new Date(),
            products:[productToAdd]
          }
          await store.addToCart(addToUser)
          productToAdd['title'] = product.value['title']
          productToAdd['stock'] = product.value['rating']['count']
          productToAdd['price'] = product.value['price']
          productToAdd['image'] = product.value['image']
          store.productsCart.push(productToAdd)
          quantity.value=1
          amount.value=0
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your item has been saved',
            showConfirmButton: false,
            timer: 1500
          });
      }

      productDialog.value = false;
      product.value = {}; 
    }
};

const updateProductForm = (selected) => {
  console.log('selected',selected)
  product.value = selected
  amount.value = price.value * quantity.value
}

const doClear = async () => {
  await store.getCarts()
}
</script>
<template>
  <div>
    <div class="card">
      <ToolbarT class="mb-4">
                  <template #start>
                      <ButtonT label="New" icon="pi pi-cart-plus" severity="success" class="mr-2" @click="openNew" />
                  </template>
              </ToolbarT>
      <DataTable
        v-model:filters="filters"
        :value="store.productsCart"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <template #paginatorstart>
          <ButtonT type="button" icon="pi pi-refresh" text @click="doClear" />
        </template>
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-3 header-table">
            <span class="text-xl text-900 font-bold mt-1">Cart</span> 
          </div>
        </template>
        <ColumnT field="title" header="Title"></ColumnT>
        <ColumnT field="productId" header="Id"></ColumnT>
        <ColumnT field="quantity" header="Quantity" style="width: 25%"></ColumnT>
        <ColumnT field="stock" header="Stock" style="width: 25%"></ColumnT>
        <ColumnT field="image" header="Image">
          <template #body="slotProps">
            <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" style="width: 32px; position: relative; left: 45%;" />
          </template>
        </ColumnT>
        <ColumnT field="price" header="Price">
        </ColumnT>
        <ColumnT :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <ButtonT icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </ColumnT>
        <template #footer> In total there are {{ carts ? carts.length : 0 }} carts. </template>
      </DataTable>
    </div>
    
    <DialogT v-model:visible="productDialog" :style="{width: '450px'}" header="Add to Cart" :modal="true" class="p-fluid">
        <img v-if="product.image" :src="`${product.image}`" :alt="product.image" style="width:100px;margin-left: 35%;"/>
        <div class="field">
            <label for="name">Name</label>
            <ProductList class="m-1" @update-product-form="updateProductForm"/>
            <small class="p-error" v-if="submitted && !product.title">Name is required.</small>
        </div>

        <div class="formgrid grid" v-if="product.rating">
            <div class="field col">
                <label for="price">Price</label>
                <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" disabled/>
            </div>
            <div class="field col">
                <label for="total">Total</label>
                <InputNumber id="total" v-model="product.rating.count" integeronly disabled/>
            </div>
            <div class="field col">
                <label for="quantity">Quantity</label>
                <InputNumber id="quantity" v-model="quantity" @keyup="calculateAmount(product.price)" integeronly/>
            </div>
            <span class="green" style="margin-left: 35%">
              Amount: {{ amount }}
            </span>
        </div>
        <template #footer>
            <ButtonT label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
            <ButtonT label="Save" icon="pi pi-check" text @click="saveProduct" />
        </template>
    </DialogT>
    <DialogT v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete <b>'{{product.title}}'</b>?</span>
        </div>
        <template #footer>
            <ButtonT label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
            <ButtonT label="Yes" icon="pi pi-check" text @click="deleteProduct" />
        </template>
    </DialogT>
    <DialogT v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete the selected products?</span>
        </div>
        <template #footer>
            <ButtonT label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
            <ButtonT label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
        </template>
    </DialogT>
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
