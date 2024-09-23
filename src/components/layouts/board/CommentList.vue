<template>
  <div class="comment-section">
    <CommentForm :postId="postId" :parentId="null" />
    <div v-if="commentList && commentList.length > 0" class="comment-container">
      <div v-for="item in commentList" :key="item.id" class="comment-item">
        <div class="comment-content">
          <p class="comment-user">{{ item.userId }}</p>
          <p class="comment-text">{{ item.content }}</p>
          <p class="comment-text">{{ formatDateTime(item.createdDateTime) }}</p>
          <button @click="showCommentForm(item.id)">답글 달기</button>
        </div>
        <CommentForm
          v-if="commentFormVisible[item.id]"
          :postId="postId"
          :parentId="item.id"
          @closeForm="closeCommentForm(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CommentForm from './CommentForm.vue'
import { FormatDateTime } from '@/utils/time/FormatDateTime'

export default {
  name: 'CommentList',
  components: {
    CommentForm,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const commentList = ref(null)
    const commentFormVisible = ref({})

    onMounted(() => {
      getCommentList(props.postId)
    })

    const getCommentList = async (postId) => {
      try {
        const response = await axios.get(
          `http://localhost:8082/comments/${postId}`,
        )
        commentList.value = response.data.data
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    const showCommentForm = (id) => {
      commentFormVisible.value[id] = !commentFormVisible.value[id]
    }

    const closeCommentForm = (id) => {
      commentFormVisible.value[id] = false
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
      showCommentForm,
      commentFormVisible,
      closeCommentForm,
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
}

.comment-content {
  margin-bottom: 10px;
}
</style>
