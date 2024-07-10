<template>
  <div>asdf</div>
</template>
<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  name: 'CommentList',
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {}
  },
}
</script>
<style></style>
