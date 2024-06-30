<template>
  <div>
    <v-app>
      <v-bottom-navigation>
        <v-btn
          v-for="item in bottomNavigationItems"
          :key="item.routerName"
          @click="routeLink(item.routerName)"
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
        routerName: 'chatlist',
        iconName: 'mdi-message-text',
        name: '채팅',
      },
    ])

    const routeLink = (routerName) => {
      router.push(routerName)
    }

    return {
      bottomNavigationItems,
      routeLink,
    }
  },
}
</script>
<style></style>
