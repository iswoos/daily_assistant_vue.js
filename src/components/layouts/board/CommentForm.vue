<template>
  <div class="comment-form">
    <textarea v-model="comment" placeholder="댓글을 입력하세요..." />
    <button @click="submitComment">댓글 작성</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { JsonStorage } from '@/utils/storage/JsonStorage'

export default {
  name: 'CommentForm',
  props: {
    postId: {
      type: String,
      required: true,
    },
    parentId: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const comment = ref('')

    const submitComment = async () => {
      if (!comment.value.trim()) {
        alert('댓글을 입력해주세요.')
        return
      }
      try {
        await axios.post(`http://localhost:8082/comments/${props.postId}`, {
          content: comment.value,
          userId: JsonStorage.get('user').userId,
          parentId: props.parentId,
        })
        comment.value = ''
        alert('댓글이 성공적으로 작성되었습니다.')
        emit('closeForm')
      } catch (error) {
        console.error(error)
        alert('댓글 작성에 실패했습니다.')
      }
    }

    return {
      comment,
      submitComment,
    }
  },
}
</script>

<style>
.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
textarea {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  resize: none;
}
button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
