<template lang="">
  <img :src="product.image" class="room-img" />
  <h4 @click="mordal_on(product.content)">{{ product.title }}</h4>
  <p @click="onClickGetData">{{ product.price }} 만원</p>
</template>
<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      image: String,
      content: String,
      price: Number,
      title: String,
    },
  },

  data() {
    return {}
  },

  mounted() {
    console.log(this.product)
  },
}
</script>
<style lang=""></style>
