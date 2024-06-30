import { createApp } from 'vue'
import App from './App.vue'

// 생성한 뷰 라우터 받아오기
import { router } from './router/index.js'
import vuetify from './plugins/vuetify'

createApp(App).use(router).use(vuetify).mount('#app')
