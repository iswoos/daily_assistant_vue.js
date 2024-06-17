<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2>Signup</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="userId">UserId</label>
          <input type="text" id="userId" v-model="form.userId" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
          />
        </div>
        <button type="submit" class="signup-button">Signup</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'SignupPage',
  setup() {
    const router = useRouter()

    const form = reactive({
      userId: '',
      password: '',
    })

    const error = ref('')

    const signup = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8082/members/signup',
          {
            userId: form.userId,
            password: form.password,
          },
        )

        router.push('/login')

        // localStorage.setItem('token', response.data.token)

        // 로그인 성공 후 페이지 이동을 원한다면 다음과 같이 사용할 수 있습니다.
        // router.push('/dashboard');
      } catch (error) {
        error.value = 'Invalid credentials. Please try again.'
        console.error('Login error:', error)
      }
    }

    return {
      form,
      error,
      signup,
    }
  },
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.signup-form {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.signup-group {
  margin-bottom: 10px; /* 입력창 간격을 줄였습니다 */
}

label {
  font-size: 0.9rem;
  font-weight: bold;
}

input[type='text'],
input[type='password'] {
  width: calc(100% - 20px); /* 폼의 패딩을 고려해 입력창 너비를 조정했습니다 */
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.signup-button {
  margin-top: 20px;
}
.error {
  color: #dc3545;
  margin-top: 10px;
  text-align: center;
}
</style>
