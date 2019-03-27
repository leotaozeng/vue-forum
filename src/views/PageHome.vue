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

export default {
  mixins: [asyncDataStatus],

  components: {
    CategoryList
  },

  computed: {
    ...mapState(['categories']),

    catgories () {
      return Object.values(this.categories)
    }
  },

  // The earlier I instantiate the call
  // the more time it has to resolve before the user sees the page.
  beforeCreate () {
    this.$store
      .dispatch('fetchAllCategories')
      .then(categories =>
        Promise.all(
          categories.map(category =>
            this.$store.dispatch({ type: 'fetchForums', ids: category.forums })
          )
        )
      )
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>
