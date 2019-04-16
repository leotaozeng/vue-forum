<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>{{ category.name }}</h1>

    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [asyncDataStatus],

  components: {
    CategoryListItem
  },

  props: {
    categoryId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState({
      categories: state => state.categories.items
    }),

    category () {
      return this.categories[this.categoryId]
    }
  },

  methods: {
    ...mapActions({
      fetchCategory: 'categories/fetchCategory',
      fetchForums: 'forums/fetchForums'
    })
  },

  created () {
    // action
    this.fetchCategory({ id: this.categoryId })
      .then(category => this.fetchForums({ ids: category.forums }))
      .then(forums =>
        Promise.all(forums.map(forum => {
          if (forum.threads) {
            const threads = Object.keys(forum.threads)
            return this.$store.dispatch('threads/fetchThread', { id: threads[0] })
          }
        }))
      )
      .then((threads) => {
        Promise.all(threads.map((thread) => {
          if (thread) {
            return this.$store.dispatch('users/fetchUser', { id: thread.userId })
          }
        }))
      })
      .then(this.asyncDataStatus_fetched)
  }
}
</script>
