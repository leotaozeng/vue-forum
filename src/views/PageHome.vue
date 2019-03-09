<template>
  <div class="col-full push-top">
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

  computed: {
    ...mapState([
      'categories'
    ]),

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
    this.fetchAllCategories().then(categories => {
      categories.forEach(category => {
        this.fetchForums({ ids: category.forums }).then(forums => {
          forums.forEach(forum => {
            if (forum.threads) {
              this.fetchThread({ id: Object.keys(forum.threads)[0] }).then(
                thread => this.fetchUser({ id: thread.userId })
              )
            }
          })
        })
      })
    })
  }
}
</script>
