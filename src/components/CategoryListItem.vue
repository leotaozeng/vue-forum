<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link :to="{name: 'Category', params: {id: category['.key']}}">{{ category.name }}</router-link>
    </h2>

    <ForumList :forums="categoryForums" />
  </div>
</template>

<script>

import ForumList from '@/components/ForumList'

export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    categoryForums () {
      return Object.values(this.$store.state.sourceData.forums).filter((forum) => {
        return forum.categoryId === this.category['.key']
      })
    }
  },

  components: {
    ForumList
  }
}
</script>

<style>
</style>
