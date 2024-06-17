<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
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
        <button type="submit">Login</button>
        <router-link to="/signup">
          <button type="button" class="signup-button">Sign up</button>
        </router-link>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
// useRouter : 라우터 인스턴스로 javascript에서 다른 페이지로 이동할 수 있다.
// useRoute : 현재 활성 라우트 정보에 접근할 수 있다. (읽기 전용)
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()

    const form = reactive({
      userId: '',
      password: '',
    })

    const error = ref('')

    const login = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8082/members/login',
          {
            userId: form.userId,
            password: form.password,
          },
        )

        router.push('/main')
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
      login,
    }
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.login-form {
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

.form-group {
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
  margin-top: 10px; /* 회원가입 버튼 위쪽 간격 추가 */
}

.error {
  color: #dc3545;
  margin-top: 10px;
  text-align: center;
}
</style>
