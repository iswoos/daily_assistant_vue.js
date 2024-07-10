<template>
  <div>
    <GetPost :postId="postId" @postUserId="handlePostUserId" />
  </div>
  <div>
    <CommentList :postId="postId" />
  </div>
  <div class="button-section" v-if="isAuthor">
    <button @click="editPost">수정</button>
    <button @click="deletePost">삭제</button>
  </div>
  <div class="button-section">
    <button @click="writePost">글쓰기</button>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GetPost from '@/components/layouts/board/GetPost.vue'
import CommentList from '@/components/layouts/board/CommentList.vue'
import { JsonStorage } from '@/utils/storage/JsonStorage'

export default {
  name: 'PostPage',
  components: {
    GetPost,
    CommentList,
  },
  setup() {
    const router = useRouter()
    const postId = ref(null)
    const isAuthor = ref(false)

    postId.value = router.currentRoute.value.params.postId

    const handlePostUserId = (postUserId) => {
      const currentUser = JsonStorage.get('user')
      if (currentUser && currentUser.userId === postUserId) {
        isAuthor.value = true
      }
    }

    const editPost = () => {
      // 수정 API 작동 후, 해당 게시글 새로고침
      console.log('Editing post', postId.value)
    }

    const deletePost = () => {
      // 삭제 API 작동 후, 게시글 리스트로 이동
      console.log('Deleting post', postId.value)
    }

    const writePost = () => {
      // 글쓰기 화면으로 이동
      console.log('Writing new post')
    }

    return {
      postId,
      isAuthor,
      editPost,
      deletePost,
      writePost,
      handlePostUserId,
    }
  },
}
</script>
<style></style>
