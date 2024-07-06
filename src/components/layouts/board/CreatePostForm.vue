<template>
  <div class="create-post-form">
    <div class="form-header">
      <button
        v-for="category in categories"
        :key="category"
        class="category-button"
      >
        {{ category }}
      </button>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">제목</label>
        <input
          type="text"
          id="title"
          v-model="title"
          placeholder="제목을 입력해 주세요."
          required
        />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="content"
          placeholder="내용을 입력해 주세요."
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="image">이미지 등록</label>
        <input
          type="file"
          id="image"
          @change="handleImageUpload"
          accept="image/*"
        />
      </div>
      <button type="submit" class="submit-button">작성하기</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CreatePostForm',
  setup() {
    const title = ref('')
    const content = ref('')
    const image = ref(null)
    const categories = ref(['일반', '팁', '정보', '기타'])
    const router = useRouter()

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        image.value = URL.createObjectURL(file)
      }
    }

    const handleSubmit = () => {
      // 여기에 게시글 작성 로직 추가 (예: API 호출)
      console.log('제목:', title.value)
      console.log('내용:', content.value)
      if (image.value) {
        console.log('이미지:', image.value)
      }
      router.push('/board')
    }

    return {
      title,
      content,
      image,
      categories,
      handleImageUpload,
      handleSubmit,
    }
  },
}
</script>

<style>
.create-post-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.form-header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.category-button {
  padding: 10px 20px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.category-button:hover {
  background-color: #ddd;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group input[type='file'] {
  padding: 3px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
