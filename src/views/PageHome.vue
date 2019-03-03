<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :catgories="catgories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import { mapActions } from 'vuex'

export default {
  components: {
    CategoryList
  },

  computed: {
    catgories () {
      const { categories } = this.$store.state

      return Object.values(categories)
    }
  },

  methods: {
    // the mapActions helper
    ...mapActions([
      'fetchAllCategories',
      'fetchForums'
    ])
  },

  beforeCreate () {
    console.log(this.fetchAllCategories)
  },

  created () {
    // Since the Home page doesn't have any ids so I have to fetch all categories
    this.fetchAllCategories().then(categories => {
      console.log(categories)
      categories.forEach(category => {
        const forumIds = Object.keys(category.forums)

        this.fetchForums({ ids: forumIds })
      })
    })
  },

  beforeMount () {
    console.log('📡 beforeMount', this.catgories, this.$el)
  },

  mounted () {
    console.log('📡 mounted', this.catgories, this.$el)
  }
}
</script>
