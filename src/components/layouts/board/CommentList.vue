<template>
  <div class="comment-container" v-if="commentList && commentList.length">
    "asdf"
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  name: 'CommentList',
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const commentList = ref(null)

    onMounted(() => {
      getCommentList(props.postId)
    })

    const getCommentList = async (postId) => {
      try {
        const response = await axios.get(
          `http://localhost:8082/comments/${postId}`,
        )
        console.log(response)
        commentList.value = response.data.data
      } catch (error) {
        error.value = 'invalid'
      }
    }

    return {}
  },
}
</script>
<style></style>
