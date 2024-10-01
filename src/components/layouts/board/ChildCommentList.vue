<template>
  <div class="child-comments">
    <div
      v-for="child in childComments"
      :key="child.id"
      class="child-comment-item"
    >
      <button class="child-comment-user" @click="userNameClick()">
        {{ child.userId }}
      </button>
      <p class="child-comment-text">{{ child.content }}</p>
      <p class="child-comment-date">
        {{ formatDateTime(child.createdDateTime) }}
      </p>
      <button @click="showCommentForm(child.id)">답글 달기</button>
      <button
        v-if="child.replyCount > 0 && !child.childCommentsLoaded"
        @click="getChildCommentList(postId, child.id)"
      >
        답글 {{ child.replyCount }}개
      </button>

      <CommentForm
        v-if="commentFormVisible[child.id]"
        :postId="postId"
        :parentId="child.id"
        @closeForm="closeCommentForm(child.id)"
      />

      <!-- 하위 댓글을 재귀적으로 표시 -->
      <ChildCommentList
        v-if="child.childComments && child.childComments.length > 0"
        :childComments="child.childComments"
        :postId="postId"
        :getChildCommentList="getChildCommentList"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CommentForm from './CommentForm.vue'
import { FormatDateTime } from '@/utils/time/FormatDateTime'
import { clickaction } from '@/utils/user/UserNameClickAction'

export default {
  name: 'ChildCommentList',
  components: {
    CommentForm,
  },
  props: {
    childComments: {
      type: Array,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    getChildCommentList: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const commentFormVisible = ref({})

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
      commentFormVisible,
      showCommentForm,
      closeCommentForm,
      formatDateTime,
      userNameClick,
    }
  },
}
</script>

<style scoped>
.child-comments {
  margin-left: 20px; /* 하위 댓글 들여쓰기 */
}

.child-comment-item {
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.child-comment-user {
  background-color: beige;
}
</style>
