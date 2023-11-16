import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Rating from 'primevue/rating'
import Dropdown from 'primevue/dropdown'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import ToastService from 'primevue/toastservice';
//import ColumnGroup from 'primevue/columngroup';   // optional
//import Row from 'primevue/row';

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService);

app.component('DataTable', DataTable)
app.component('ColumnT', Column)
app.component('ButtonT', Button)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('RatingT', Rating)
app.component('DropdownT', Dropdown)
app.component('ToolbarT', Toolbar)
app.component('DialogT', Dialog)

app.mount('#app')
