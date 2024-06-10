<template>
  <img :src="product.image" class="room-img" />
  <h4 @click="emitMordalOn">{{ product.title }}</h4>
  <p>{{ product.price }} 만원</p>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitMordalOn() {
      this.$emit('mordal-on', this.product.content)
    },
  },
  mounted() {
    console.log(this.product)
  },
}
</script>

<style>
/* 스타일 생략 */
</style>
