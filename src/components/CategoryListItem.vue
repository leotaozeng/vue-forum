<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link
        :to="{ name: 'Category', params: { categoryId: category['.key'] } }"
        >{{ category.name }}</router-link
      >
    </h2>

    <ForumList :forums="categoryForums" />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList'
import { mapState } from 'vuex'

export default {
  components: {
    ForumList
  },

  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState({
      forums: state => state.forums.items
    }),

    categoryForums() {
      return Object.values(this.forums).filter(
        forum => forum.categoryId === this.category['.key']
      )
    }
  }
}
</script>
