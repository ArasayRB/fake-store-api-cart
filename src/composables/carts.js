import { ref } from 'vue'
import http from '../http-common'

export default function useCarts() {
  const cart = ref([]) // just one cart
  const carts = ref([])
  const products = ref([])

  const errors = ref([]) //array of strings

  const getCarts = async () => {
    try {
      const response = await http.get('/carts/user/4')
      console.log('Cart by user',response.data)

      carts.value = response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const allProducts = async () => {
    try {
      const response = await http.get('/products')
      console.log('Cart by user',response.data)

      products.value = response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  return {
    errors,
    cart,
    carts,
    getCarts,
    allProducts,
    products
  }
}