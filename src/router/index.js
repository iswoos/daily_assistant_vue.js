import { createRouter, createWebHistory } from 'vue-router'

import ProductPage from '../pages/ProductPage.vue'
import MainPage from '../pages/Main.vue'
import LoginPage from '../pages/Login.vue'
import SignupPage from '../pages/Signup.vue'
import BoardPage from '../pages/Board.vue'
import ChatListPage from '../pages/ChatList.vue'

// 라우터 설계
const routes = [
  { path: '/1', component: ProductPage },
  { path: '/login', component: LoginPage },
  { path: '/main', component: MainPage },
  { path: '/signup', component: SignupPage },
  { path: '/chatlist', component: ChatListPage },
  { path: '/board', component: BoardPage },
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 라우터 추출 (main.js에서 import)
export { router }
