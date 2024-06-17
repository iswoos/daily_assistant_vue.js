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
  setup(props, { emit }) {
    const emitMordalOn = () => {
      emit('mordal-on', props.product.content)
    }

    return {
      emitMordalOn,
    }
  },
  mounted() {
    console.log(this.product)
  },
}
</script>

<style>
/* 스타일 생략 */
</style>
