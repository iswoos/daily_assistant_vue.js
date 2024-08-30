<template>
  <div class="comment-section">
    <div v-if="commentList && commentList.length > 0" class="comment-container">
      <div v-for="item in commentList" :key="item.id" class="comment-item">
        <div class="comment-content">
          <p class="comment-user">{{ item.userId }}</p>
          <p class="comment-text">{{ item.content }}</p>
          <p class="comment-text">{{ formatDateTime(item.createdDateTime) }}</p>
        </div>
      </div>
    </div>
    <div v-else class="loading">댓글쓰는 창 뜨게 하자</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { FormatDateTime } from '@/utils/time/FormatDateTime'

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
        commentList.value = response.data.data
        console.log(commentList.value)
      } catch (error) {
        error.value = 'invalid'
      }
    }

    const formatDateTime = (dateTimeStr) => {
      try {
        return FormatDateTime.toDateTime(dateTimeStr)
      } catch (error) {
        return 'Invalid date/time'
      }
    }

    return {
      commentList,
      formatDateTime,
    }
  },
}
</script>
<style>
.comment-section {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
}

.comment-container {
  margin-bottom: 20px;
}

.comment-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.comment-content {
  margin-bottom: 10px;
}
</style>
