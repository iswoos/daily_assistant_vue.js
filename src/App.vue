<template>

  <div class= "black-bg" v-if="mordal_state == true">
    <div class= "white-bg">
      <h4> 상세페이지임 </h4>
      <p> 상세페이지 내용임 </p>
      <button @click="mordal_off"> 닫기 </button>
    </div>
  </div>


  <div class = "menu">
    <a v-for = "(작명,i) in 메뉴들" :key="i"> {{작명}}</a>
  </div>

  <div v-for="(product, i) in products" :key="i">
    <img :src="getImageSrc(i)" class="room-img">
    <h4 @click="mordal_on"> {{ product.name }} </h4>
    <p>{{ product.price }} 만원</p>
    <button @click="counterIncrease"> 허위매물신고 </button> 
    <!-- <span> 신고수 : {{counters[0]}} </span> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  // 데이터 보관함
  data(){
    return {
      메뉴들 : ['Home', 'Shop', 'About'],
      products : [
                  {name : '역삼동원룸', price : 10 , counter : 0 },
                  {name : '천호동원룸', price : 20 , counter : 0 },
                  {name : '마포구원룸', price : 30 , counter : 0 }
                ],
      mordal_state : false,
    }
  },
  methods : {
    counterIncrease(){
      this.counters++;
    },
    mordal_on(){
      this.mordal_state = true;
    },
    mordal_off(){
      this.mordal_state = false;
    },
    getImageSrc(index) {
      return require(`./assets/room${index}.jpg`);
    }
  },
  components: {

  }
}
</script>

<style>
body {
  margin : 0;
}

div {
  box-sizing: border-box;
}

.black-bg{
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}

.white-bg{
  width: 100%; background: white;
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

.menu{
  background: darkslateblue;
  padding: 15px;
  border-radius: 10px;
}

.menu a {
  color: white;
  padding: 10px;
}

.room-img{
  width : 100%;
  margin-top : 40px
}

</style>
