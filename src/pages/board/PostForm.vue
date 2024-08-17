<template>
  <div>
    <PostForm />
    <BottomNavigationBar />
  </div>
</template>
<script>
import BottomNavigationBar from '@/components/layouts/BottomNavigationBar.vue'
import PostForm from '@/components/layouts/board/PostForm.vue'

export default {
  name: 'PostFormPage',
  components: {
    PostForm,
    BottomNavigationBar,
  },
  setup() {
    return {}
  },
}
</script>
<style></style>
