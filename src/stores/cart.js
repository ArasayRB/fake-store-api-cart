import { defineStore } from 'pinia'
import http from '../http-common'

 const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    productsCart:[],
    cart:{},
    carts:[],
    infoProd:{},
    errors:{}
  }),
  actions: {
   async getCarts(){
    try {
        const response = await http.get('/carts/user/4')
        console.log('Cart by user',response.data[0].products)
  
        this.productsCart = response.data[0].products
        this.allProducts()
      } catch (error) {
        console.log(error.message)
      }
    },
    async addToCart(item){
        try {
            const response = await http.post('/carts',JSON.stringify(
                item
            ))
            console.log('Cart added by user',response.data[0].products)
      
          } catch (error) {
            console.log(error.message)
          }
        },
    async allProducts(){
        try {
            const response = await http.get('/products')
      
            this.products = response.data
            for (let index = 0; index < this.productsCart.length; index++) {
                const element = this.productsCart[index];
                this.infoProd = this.products.filter((prod)=>prod.id===element.productId)
                if(this.infoProd.length===1){
                    this.productsCart[index]['title'] = this.infoProd[0]['title']
                    this.productsCart[index]['stock'] = this.infoProd[0]['rating']['count']
                    this.productsCart[index]['price'] = this.infoProd[0]['price']
                    this.productsCart[index]['image'] = this.infoProd[0]['image']
                }
                console.log('info',this.infoProd[0]['category'],this.infoProd.length)
            }
          } catch (error) {
            console.log(error.message)
          }
        }
  },
  getters: {
    totalClicks() {
      return Object.values(this.options).reduce((total, current) => {
        return total + current;
      }, 0);
    },
  },
});

export default useCartStore