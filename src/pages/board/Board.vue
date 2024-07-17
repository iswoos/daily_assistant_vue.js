<template>
  <div>
    <div class="table-container">
      <PostList />
      <button class="postCreate" @click.prevent="routePage()">글쓰기</button>
    </div>
    <BottomNavigationBar />
  </div>
</template>
<script>
import BottomNavigationBar from '@/components/layouts/BottomNavigationBar.vue'
import PostList from '@/components/layouts/board/PostList.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'BoardPage',
  components: {
    BottomNavigationBar,
    PostList,
  },
  setup() {
    const router = useRouter()

    const routePage = () => {
      router.push('/create/post')
    }

    return {
      routePage,
    }
  },
}
</script>
<style>
.table-container {
  position: relative;
}

.postCreate {
  margin-left: 50em;
}

.postCreate:hover {
  outline-color: transparent;
  outline-style: solid;
  box-shadow: 0 0 0 2px blue;
  transition: 0.7s;
}
</style>
