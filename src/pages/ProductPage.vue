<template>
  <ProductDetailModal
    :product="product"
    :product_content="product_content"
    :mordal_state="mordal_state"
    @mordal_off="mordal_off"
  />

  <div class="menu">
    <a v-for="(작명, i) in 메뉴들" :key="i">{{ 작명 }}</a>
  </div>

  <div v-for="(product, i) in products" :key="i">
    <ProductItem :product="product" @mordal-on="mordal_on" />
  </div>
</template>

<script>
import dummyData from '../assets/oneroom'
import ProductItem from '../components/product/ProductItem'
import ProductDetailModal from '@/components/product/ProductDetailModal.vue'

export default {
  name: 'ProductPage',
  components: {
    ProductItem,
    ProductDetailModal,
  },
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
        // const { data } = await getProduct(this.page);
        console.log('axios 통신성공')
        // console.log(data);
        // this.axios_data = data;

        console.log(this.axios_data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style>
/* 스타일 생략 */
</style>
