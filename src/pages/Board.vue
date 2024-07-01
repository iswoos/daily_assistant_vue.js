<template>
  <div>
    <PostList />
  </div>

  <div>
    <BottomNavigationBar />
  </div>
</template>
<script>
import BottomNavigationBar from '@/components/layouts/BottomNavigationBar.vue'
import PostList from '@/components/layouts/board/PostList.vue'

export default {
  name: 'BoardPage',
  components: {
    BottomNavigationBar,
    PostList,
  },
  setup() {
    return {}
  },
}
</script>
<style></style>
