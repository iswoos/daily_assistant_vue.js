<template>
  <div>
    <h2>Post Details</h2>
    <div v-if="post"></div>
    <div v-else>
      <p>게시글을 불러오는 중입니다...</p>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'GetPost',

  props: {
    postId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const post = ref(null)

    onMounted(() => {
      getPost(props.postId)
    })

    const getPost = async (postId) => {
      try {
        const response = await axios.get(
          `http://localhost:8082/posts/${postId}`,
        )
        post.value = response.data
        console.log(response)
      } catch (error) {
        error.value = 'invalid'
      }
    }

    return {
      post,
    }
  },
}
</script>

<style>
/* 필요한 스타일링 추가 */
</style>
