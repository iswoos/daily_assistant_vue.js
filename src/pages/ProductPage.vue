<template>
  <div class="black-bg" v-if="mordal_state == true">
    <div class="white-bg">
      <h4>상세페이지임</h4>
      <p>{{ product_content }}</p>
      <button @click="mordal_off">닫기</button>
    </div>
  </div>

  <div class="menu">
    <a v-for="(작명, i) in 메뉴들" :key="i">{{ 작명 }}</a>
  </div>

  <div v-for="(product, i) in products" :key="i">
    <img :src="product.image" class="room-img" />
    <h4 @click="mordal_on(product.content)">{{ product.title }}</h4>
    <p @click="onClickGetData">{{ product.price }} 만원</p>
  </div>
</template>

<script>
import dummyData from '../assets/oneroom'

export default {
  name: 'ProductPage',
  // 데이터 보관함
  data() {
    return {
      메뉴들: ['Home', 'Shop', 'About'],
      products: dummyData,
      product_content: null,
      mordal_state: false,
      axios_data: null,
      page: 1,
    }
  },

  watch: {
    page(current, prev) {
      console.log({ prev, current })
    },
  },
  methods: {
    mordal_on(content) {
      this.product_content = content
      this.mordal_state = true
    },
    mordal_off() {
      this.mordal_state = false
    },

    async onClickGetData() {
      try {
        this.page = 2
        // const { data } = await getProduct(this.page)
        console.log('axios 통신성공')
        // console.log(data)
        // this.axios_data = data

        console.log(this.axios_data)
      } catch (e) {
        console.error(e)
      }
    },
  },
  components: {},
}
</script>

<style>
body {
  margin: 0;
}

div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 10px;
}

.menu a {
  color: white;
  padding: 10px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}
</style>
