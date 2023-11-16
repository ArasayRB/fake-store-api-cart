import { ref } from 'vue'
import http from '../http-common'

export default function useProducts() {
  const product = ref([]) // just one product
  const products = ref([])

  const errors = ref([]) //array of strings

  const getProducts = async () => {
    try {
      const response = await http.get('/products')
      console.log(response.data)

      products.value = response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const getProduct = async (id) => {
    const response = await http.get(`/products/${id}`)
    product.value = response.data
  }

  /** search by title */
  const getProductsByCategory = async (searchQuery) => {
    if (searchQuery.trim() === '')
      // this value is required and can't be empty for be sent to the api
      return
    const response = await http.get(`/products/category/${searchQuery}`)
    console.log('By Category',response.data)
    products.value = response.data
  }

  return {
    errors,
    product,
    products,
    getProduct,
    getProducts,
    getProductsByCategory
  }
}
