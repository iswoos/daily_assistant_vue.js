<template>
  <div class="comment-section">
    <CommentForm :postId="postId" :parentId="null" />
    <div v-if="commentList && commentList.length > 0" class="comment-container">
      <div v-for="item in commentList" :key="item.id" class="comment-item">
        <div class="comment-content">
          <button class="comment-user" @click="userNameClick()">
            {{ item.userId }}
          </button>
          <p class="comment-text">{{ item.content }}</p>
          <p class="comment-text">{{ formatDateTime(item.createdDateTime) }}</p>
          <button @click="showCommentForm(item.id)">답글 달기</button>
          <button
            v-if="item.replyCount > 0"
            @click="toggleChildComments(item.id)"
          >
            {{
              childCommentVisible[item.id]
                ? '접기'
                : `답글 ${item.replyCount}개`
            }}
          </button>
        </div>

        <!-- 하위 댓글 리스트 표시 -->
        <ChildCommentList
          v-if="childCommentVisible[item.id]"
          :childComments="item.childComments"
          :postId="postId"
          :getChildCommentList="getChildCommentList"
        />

        <!-- 답글 폼 -->
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
import ChildCommentList from './ChildCommentList.vue'
import { FormatDateTime } from '@/utils/time/FormatDateTime'
import { clickaction } from '@/utils/user/UserNameClickAction'

export default {
  name: 'CommentList',
  components: {
    CommentForm,
    ChildCommentList,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const commentList = ref([])
    const commentFormVisible = ref({})
    const childCommentVisible = ref({}) // 자식 댓글의 표시/숨기기 상태 저장

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

    const getChildCommentList = async (postId, parentId) => {
      try {
        const response = await axios.get(
          `http://localhost:8082/comments/${postId}/${parentId}`,
        )
        const parentComment = findCommentById(commentList.value, parentId)

        if (parentComment) {
          if (!parentComment.childComments) {
            parentComment.childComments = []
          }
          parentComment.childComments = [
            ...new Set([...parentComment.childComments, ...response.data.data]),
          ]

          parentComment.childCommentsLoaded = true
        }
      } catch (error) {
        console.error('Error fetching child comments:', error)
      }
    }

    const toggleChildComments = async (id) => {
      const parentComment = findCommentById(commentList.value, id)
      if (!parentComment.childCommentsLoaded) {
        await getChildCommentList(props.postId, id)
      }
      childCommentVisible.value[id] = !childCommentVisible.value[id]
    }

    const findCommentById = (comments, id) => {
      for (let comment of comments) {
        if (comment.id === id) return comment
        if (comment.childComments) {
          const found = findCommentById(comment.childComments, id)
          if (found) return found
        }
      }
      return null
    }

    const userNameClick = () => {
      try {
        return clickaction.nameClickAction()
      } catch (error) {
        return 'Invalid'
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
      userNameClick,
      showCommentForm,
      commentFormVisible,
      closeCommentForm,
      getChildCommentList,
      childCommentVisible, // 자식 댓글의 표시 상태를 반환
      toggleChildComments,
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

.comment-user {
  background-color: beige;
}
</style>
