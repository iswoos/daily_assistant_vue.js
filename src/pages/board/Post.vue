<template>
  <div>
    <GetPost :postId="postId" />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GetPost from '@/components/layouts/board/GetPost.vue'
export default {
  name: 'PostPage',
  components: {
    GetPost,
  },
  setup() {
    const router = useRouter()
    const postId = ref(null)

    postId.value = router.currentRoute.value.params.postId

    return {
      postId,
    }
  },
}
</script>
<style></style>
