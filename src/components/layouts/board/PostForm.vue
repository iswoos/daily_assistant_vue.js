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
        <input
          type="file"
          ref="imageFile"
          id="image"
          @change="imageUpload"
          accept="image/*"
          multiple
        />
        <div v-if="imageUrls.length">
          <img
            v-for="(url, index) in imageUrls"
            :key="index"
            :src="url"
            alt="업로드된 이미지"
            class="image-preview"
          />
        </div>
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
    const imageFiles = ref([])
    const imageUrls = ref([])
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
        imageUrls.value = postInfo.image || []
        isModify.value = true
      }
    })

    const selectCategory = (category) => {
      selectedCategory.value = category
    }

    const imageUpload = (event) => {
      const files = event.target.files
      imageFiles.value = Array.from(files)
      imageUrls.value = imageFiles.value.map((file) =>
        URL.createObjectURL(file),
      )
    }

    const submit = async () => {
      let response
      try {
        const formData = new FormData()
        const postData = {
          title: title.value,
          content: content.value,
          postCategory: selectedCategory.value,
        }

        if (!isModify.value) {
          postData.userId = JsonStorage.get('user').userId
        }

        formData.append(
          'post',
          new Blob([JSON.stringify(postData)], { type: 'application/json' }),
        )

        imageFiles.value.forEach((file) => {
          formData.append('images', file)
        })

        if (isModify.value) {
          response = await axios.patch(
            `http://localhost:8082/posts/${postId.value}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
        } else {
          response = await axios.post('http://localhost:8082/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }

        const preSignedUrls = response.data.data.imageUrls
        await Promise.all(
          imageFiles.value.map((file, index) => {
            const presignedUrl = preSignedUrls[index]
            return axios.put(presignedUrl, file, {
              headers: {
                'Content-Type': file.type,
              },
            })
          }),
        )
        alert('게시글이 성공적으로 등록되었습니다.')
        router.push('/board')
      } catch (error) {
        alert('업로드가 실패하였습니다.')
      }
    }

    return {
      title,
      content,
      imageFiles,
      imageUrls,
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
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  max-width: 150px;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
