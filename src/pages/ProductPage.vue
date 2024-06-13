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
import { ref } from 'vue'
import dummyData from '../assets/oneroom'
import ProductItem from '../components/product/ProductItem'
import ProductDetailModal from '@/components/product/ProductDetailModal.vue'

export default {
  name: 'ProductPage',
  components: {
    ProductItem,
    ProductDetailModal,
  },
  setup() {
    const 메뉴들 = ref(['Home', 'Shop', 'About'])
    const products = ref(dummyData)
    const product_content = ref(null)
    const mordal_state = ref(false)
    const axios_data = ref(null)
    const page = ref(1)

    const mordal_on = (content) => {
      product_content.value = content
      mordal_state.value = true
    }

    const mordal_off = () => {
      mordal_state.value = false
    }

    const onClickGetData = async () => {
      try {
        // const { data } = await getProduct(page.value);
        console.log('axios 통신성공')
        // console.log(data);
        // axios_data.value = data;

        console.log(axios_data.value)
      } catch (e) {
        console.error(e)
      }
    }

    return {
      메뉴들,
      products,
      product_content,
      mordal_state,
      axios_data,
      page,
      mordal_on,
      mordal_off,
      onClickGetData,
    }
  },
}
</script>

<style>
/* 스타일 생략 */
</style>
