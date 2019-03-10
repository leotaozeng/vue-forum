<template>
  <div v-if="ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>

    <CategoryList :catgories="catgories"/>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'
// Order: State, Getters, Mutations, Actions
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CategoryList
  },

  data () {
    return {
      ready: false
    }
  },

  computed: {
    ...mapState(['categories']),

    catgories () {
      return Object.values(this.categories)
    }
  },

  methods: {
    ...mapActions([
      'fetchAllCategories',
      'fetchForums',
      'fetchThread',
      'fetchUser'
    ])
  },

  created () {
    // Since the Home page doesn't have any ids so I have to fetch all categories
    this.fetchAllCategories()
      .then(categories =>
        Promise.all(
          categories.map(category =>
            this.fetchForums({ ids: category.forums })
          )
        )
      )
      .then(() => {
        this.ready = true
      })
  }
}
</script>
