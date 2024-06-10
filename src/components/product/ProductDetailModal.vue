<template>
  <div class="black-bg" v-if="mordal_state">
    <div class="white-bg">
      <h4>상세페이지임</h4>
      <p>{{ product_content }}</p>
      <button @click="emitmordal_off">닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    mordal_state: {
      type: Boolean,
      required: true,
    },
    product_content: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitmordal_off() {
      this.$emit('mordal_off')
    },
  },
}
</script>
<style></style>
