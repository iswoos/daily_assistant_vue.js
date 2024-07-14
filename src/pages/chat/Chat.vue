<template>
  <div>chatlist</div>

  <div>
    <ChatList />
  </div>

  <div>
    <BottomNavigationBar />
  </div>
</template>
<script>
import BottomNavigationBar from '@/components/layouts/BottomNavigationBar.vue'
import ChatList from '@/components/layouts/chat/ChatList.vue'

export default {
  name: 'ChatPage',
  components: {
    BottomNavigationBar,
    ChatList,
  },
  setup() {
    return {}
  },
}
</script>
<style></style>
