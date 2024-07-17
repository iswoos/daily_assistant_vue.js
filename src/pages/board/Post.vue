<template>
  <div>
    <GetPost :postId="postId" @postUserId="handlePostUserId" />
  </div>
  <div>
    <CommentList :postId="postId" />
  </div>
  <div class="button-section" v-if="isAuthor">
    <button @click="modifyPost">수정</button>
    <br />
    <button @click="deletePost">삭제</button>
  </div>
  <div class="button-section">
    <button @click="likesPost">추천</button>
    <br />
    <button @click="writePost">글쓰기</button>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GetPost from '@/components/layouts/board/GetPost.vue'
import CommentList from '@/components/layouts/board/CommentList.vue'
import { JsonStorage } from '@/utils/storage/JsonStorage'
import axios from 'axios'

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

    const modifyPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/posts/${postId.value}/likes`,
        )
        router.push({ path: '/modify/post', state: { post: response.data } })
      } catch (error) {
        error.value = 'invalid'
      }
    }

    const deletePost = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8082/posts/${postId.value}`,
        )
      } catch (error) {
        console.log(error)
      }
      router.push('/board')
    }

    const likesPost = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:8082/posts/${postId.value}/likes`,
        )
      } catch (error) {
        console.log(error)
      }
    }

    const writePost = () => {
      router.push('/create/post')
    }

    return {
      postId,
      isAuthor,
      modifyPost,
      deletePost,
      likesPost,
      writePost,
      handlePostUserId,
    }
  },
}
</script>
<style></style>
