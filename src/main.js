import { createApp } from 'vue'
import App from './App.vue'

import { createMemoryHistory, createRouter } from 'vue-router'
import ProductPage from './pages/ProductPage.vue'

const routes = [{ path: '/a', component: ProductPage }]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
