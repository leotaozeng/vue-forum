<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :catgories="catgories"/>
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
    ...mapActions(['fetchAllCategories', 'fetchForums', 'fetchThreads', 'fetchUser'])
  },

  beforeCreate () {
    console.log(this.fetchAllCategories)
  },

  created () {
    // Since the Home page doesn't have any ids so I have to fetch all categories
    this.fetchAllCategories().then(categories => {
      categories.forEach(category => {
        this.fetchForums({ ids: category.forums }).then(forums => {
          forums.forEach(forum => {
            if (forum.threads) {
              this.fetchThreads({ ids: forum.threads }).then(threads => {
                threads.forEach(thread => {
                  this.fetchUser({ id: thread.userId })
                })
              })
            }
          })
        })
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
