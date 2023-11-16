import { ref } from 'vue'
import http from '../http-common'

export default function useCategories() {
  const category = ref([]) // just one category
  const categories = ref([])

  const errors = ref([]) //array of strings

  const getCategories = async () => {
    try {
      const response = await http.get('/products/categories')
      console.log(response.data)

      categories.value = response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  return {
    errors,
    category,
    categories,
    getCategories,
  }
}