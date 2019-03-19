<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>

    <CategoryList :catgories="catgories"/>
  </div>
  <div v-else>loading...</div>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import asyncDataStatus from '@/mixins/asyncDataStatus'
// Order: State, Getters, Mutations, Actions
import { mapState, mapActions } from 'vuex'

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

  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },

  created () {
    // Since the Home page doesn't have any ids so I have to fetch all categories
    this.fetchAllCategories()
      .then(categories => {
        return Promise.all(
          categories.map(category => this.fetchForums({ ids: category.forums }))
        )
      })
      .then(this.asyncDataStatus_fetched)
  }
}
</script>
