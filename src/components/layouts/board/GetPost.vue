<template>
  <div class="post-container" v-if="post">
    <div class="post-header">
      <h2>{{ post.title }}</h2>
      <p>
        <strong>작성자:</strong> {{ post.userId }} | <strong>카테고리:</strong>
        {{ post.category }} | <strong>작성일:</strong>
        {{ formatDateTime(post.createdDateTime) }}
      </p>
    </div>
    <div class="post-image">
      <img :src="post.image" alt="Post Image" />
    </div>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="post-footer">
      <p><strong>조회수:</strong> {{ post.view_count }}</p>
      <p><strong>추천 수:</strong> {{ post.likes_count }}</p>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
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
        console.log(response.data)
      } catch (error) {
        error.value = 'invalid'
      }
    }

    const formatDateTime = (dateTimeStr) => {
      const dateTime = new Date(dateTimeStr)
      return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
    }

    return {
      post,
      formatDateTime,
    }
  },
}
</script>

<style>
.post-container {
  width: 70%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}

.post-header {
  margin-bottom: 20px;
}

.post-header h2 {
  margin: 0;
  font-size: 24px;
}

.post-header p {
  margin: 5px 0;
  font-size: 14px;
  color: #888;
}

.post-image {
  text-align: center;
  margin-bottom: 20px;
}

.post-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.post-content {
  margin-bottom: 20px;
  font-size: 16px;
}

.post-footer {
  font-size: 14px;
  color: #888;
}

.post-footer p {
  margin: 5px 0;
}
</style>
