import { createRouter, createWebHistory } from 'vue-router'

import ProductPage from '../pages/ProductPage.vue'
import LoginPage from '../pages/Login.vue'
import MainPage from '../pages/Main.vue'

// 라우터 설계
const routes = [
  { path: '/1', component: ProductPage },
  { path: '/login', component: LoginPage },
  { path: '/main', component: MainPage },
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 라우터 추출 (main.js에서 import)
export { router }
