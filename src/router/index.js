import { createRouter, createWebHistory } from 'vue-router'

import ProductPage from '../pages/ProductPage.vue'
import MainPage from '../pages/main/Main.vue'
import LoginPage from '../pages/Login.vue'
import SignupPage from '../pages/Signup.vue'
import BoardPage from '../pages/board/Board.vue'
import CreatePostPage from '../pages/board/CreatePost.vue'
import ChatPage from '../pages/chat/Chat.vue'
import PostPage from '../pages/board/Post.vue'

// 라우터 설계
const routes = [
  { path: '/1', component: ProductPage },
  { path: '/login', component: LoginPage },
  { path: '/main', component: MainPage },
  { path: '/signup', component: SignupPage },
  { path: '/chat', component: ChatPage },
  { path: '/board', component: BoardPage },
  { path: '/create/post', component: CreatePostPage },
  { path: '/posts/:postId', component: PostPage },
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 라우터 추출 (main.js에서 import)
export { router }
