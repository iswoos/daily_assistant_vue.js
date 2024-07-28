<template>
  <div class="app">
    <table class="board-table">
      <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="text-center">말머리</th>
          <th class="text-center">제목</th>
          <th class="text-center">글쓴이</th>
          <th class="text-center">작성일</th>
          <th class="text-center">조회</th>
          <th class="text-center">추천</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in postList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.postCategory }}</td>
          <td>
            <a href="#" @click.prevent="routePost(item.id)">
              {{ item.title }}
            </a>
          </td>
          <td>{{ item.userId }}</td>
          <td>{{ formatDateTime(item.createdDateTime) }}</td>
          <td>{{ item.viewCount }}</td>
          <td>{{ item.likesCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { FormatDateTime } from '@/utils/time/FormatDateTime'

export default {
  name: 'PostList',

  setup() {
    const router = useRouter()
    const postList = ref([])

    onMounted(() => {
      getPostList()
    })

    const getPostList = async () => {
      try {
        const response = await axios.get('http://localhost:8082/posts')
        postList.value = response.data
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

    const routePost = (postId) => {
      router.push({ path: `/posts/${postId}`, params: { postId } })
    }

    return {
      postList,
      routePost,
      formatDateTime,
      getPostList,
    }
  },
}
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.board-table th,
.board-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.board-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.text-center {
  text-align: center;
}

a:link {
  color: black;
  text-decoration: none;
}

a:visited {
  color: green;
}

a:hover {
  color: blue;
  text-decoration: underline;
}

a:active {
  color: red;
}
</style>
