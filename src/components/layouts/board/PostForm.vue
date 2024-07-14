<template>
  <div class="create-post-form">
    <div class="form-header">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          'category-button',
          { selected: category === selectedCategory },
        ]"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
    <form @submit.prevent="submit">
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
        <input type="file" id="image" @change="imageUpload" accept="image/*" />
        <img
          v-if="image"
          :src="image"
          alt="업로드된 이미지가 표시되지 않습니다."
          class="image-preview"
        />
      </div>
      <button type="submit" class="submit-button">
        {{ isModify ? '수정' : '작성' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { JsonStorage } from '@/utils/storage/JsonStorage'

export default {
  name: 'PostForm',
  setup() {
    const title = ref('')
    const content = ref('')
    const image = ref(null)
    const categories = ref(['일반', '팁', '정보', '기타'])
    const selectedCategory = ref('')
    const router = useRouter()
    const isModify = ref(false)
    const postId = ref(null)

    onMounted(() => {
      const postInfo = history.state.post
      if (postInfo) {
        postId.value = postInfo.id
        title.value = postInfo.title
        content.value = postInfo.content
        selectedCategory.value = postInfo.postCategory
        image.value = postInfo.image
        isModify.value = true
      }
    })

    const selectCategory = (category) => {
      selectedCategory.value = category
    }

    const imageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        image.value = URL.createObjectURL(file)
      }
    }

    const submit = async () => {
      try {
        if (isModify.value) {
          await axios.patch(`http://localhost:8082/posts/${postId.value}`, {
            title: title.value,
            content: content.value,
            image: image.value,
            postCategory: selectedCategory.value,
          })
        } else {
          await axios.post('http://localhost:8082/posts', {
            title: title.value,
            content: content.value,
            image: image.value,
            postCategory: selectedCategory.value,
            userId: JsonStorage.get('user').userId,
          })
        }
      } catch (error) {
        alert('업로드가 실패하였습니다.')
      }
      router.push('/board')
    }

    return {
      title,
      content,
      image,
      categories,
      selectedCategory,
      selectCategory,
      imageUpload,
      submit,
      isModify,
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

.category-button.selected {
  background-color: #4caf50;
  color: #fff;
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

.image-preview {
  display: block;
  margin-top: 10px;
  max-width: 50%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
