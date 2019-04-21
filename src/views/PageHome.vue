<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>

    <CategoryList :catgories="catgories"/>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import asyncDataStatus from '@/mixins/asyncDataStatus'
// Order: State, Getters, Mutations, Actions
import { mapState } from 'vuex'
import { Promise } from 'q'

export default {
  mixins: [asyncDataStatus],

  components: {
    CategoryList
  },

  computed: {
    ...mapState({
      categories: state => state.categories.items
    }),

    catgories () {
      return Object.values(this.categories)
    }
  },

  // The earlier I instantiate the call
  // the more time it has to resolve before the user sees the page.
  beforeCreate () {
    console.log('Page Home Before Create')
    this.$store
      .dispatch('categories/fetchAllCategories')
      .then(categories =>
        Promise.all(
          categories.map(category =>
            this.$store.dispatch('forums/fetchForums', { ids: category.forums })
          )
        )
      )
      .then(forumsArray =>
        Promise.all(forumsArray.map(forums =>
          Promise.all(forums.map(forum => {
            if (forum.threads) {
              const threads = Object.keys(forum.threads)
              return this.$store.dispatch('threads/fetchThread', { id: threads[0] })
            }
          }))
        ))
      )
      .then((threadsArray) => {
        Promise.all(threadsArray.map((threads) => {
          Promise.all(threads.map((thread) => {
            if (thread) {
              return this.$store.dispatch('users/fetchUser', { id: thread.userId })
            }
          }))
        }))
      })
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>
