<template>
  <ul class="post-list">
    <li v-for="post in posts"
        :key="post['.key']">
      <PostListItem :post="post" />
    </li>
  </ul>
</template>

<script>
import PostListItem from '@/components/PostListItem'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },

  components: {
    PostListItem
  }
}
</script>
