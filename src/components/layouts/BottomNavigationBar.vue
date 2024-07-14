<template>
  <div>
    <v-app>
      <v-bottom-navigation>
        <v-btn
          v-for="item in bottomNavigationItems"
          :key="item.routerName"
          @click.prevent="routePage(item.routerName)"
        >
          <v-icon>{{ item.iconName }}</v-icon>
          <span>{{ item.name }}</span>
        </v-btn>
      </v-bottom-navigation>
    </v-app>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'BottomNavigationBar',

  setup(props) {
    const router = useRouter()

    const bottomNavigationItems = ref([
      {
        routerName: 'main',
        iconName: 'mdi-menu',
        name: '메인',
      },
      {
        routerName: 'board',
        iconName: 'mdi-view-dashboard',
        name: '게시판',
      },
      {
        routerName: 'chat',
        iconName: 'mdi-message-text',
        name: '채팅',
      },
    ])

    const routePage = (routerName) => {
      router.push(`/${routerName}`)
    }

    return {
      bottomNavigationItems,
      routePage,
    }
  },
}
</script>
<style></style>
