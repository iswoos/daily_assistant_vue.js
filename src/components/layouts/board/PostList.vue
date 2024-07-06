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
          <td>{{ item.category }}</td>
          <td>
            <a href="#" @click.prevent="routePost(item.id)">
              {{ item.title }}
            </a>
          </td>
          <td>{{ item.writer }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.views }}</td>
          <td>{{ item.recommendations }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'PostList',

  setup() {
    const postList = ref([
      {
        id: 1,
        category: '일반',
        title: '첫 번째 게시글',
        writer: 'artistjay',
        date: '2023-06-01',
        views: 120,
        recommendations: 5,
      },
      {
        id: 2,
        category: '공지',
        title: '두 번째 게시글',
        writer: 'artistjay',
        date: '2023-06-02',
        views: 150,
        recommendations: 10,
      },
      {
        id: 3,
        category: '질문',
        title: '세 번째 게시글',
        writer: 'artistjay',
        date: '2023-06-03',
        views: 80,
        recommendations: 2,
      },
      {
        id: 4,
        category: '토론',
        title: '네 번째 게시글',
        writer: 'artistjay',
        date: '2023-06-04',
        views: 200,
        recommendations: 20,
      },
      {
        id: 5,
        category: '공지',
        title: '다섯 번째 게시글',
        writer: 'artistjay',
        date: '2023-06-05',
        views: 300,
        recommendations: 15,
      },
      {
        id: 6,
        category: '일반',
        title: '여섯 번째 게시글',
        writer: 'artistjay',
        date: '2023-06-06',
        views: 50,
        recommendations: 1,
      },
    ])

    const routePost = async (postId) => {
      try {
        const response = await axios.get(
          `http://localhost:8082/posts/${postId}`,
        )
      } catch (error) {
        error.value = 'Invalid credentials. Please try again.'
      }
      //   router.push({ name: 'BoardDetail', params: { id } })
    }

    return {
      postList,
      routePost,
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

a {
  color: black;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
