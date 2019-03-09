<template>
  <div v-if="category" class="col-full push-top">
    <h1>{{ category.name }}</h1>

    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CategoryListItem
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState(['categories']),

    category () {
      return this.categories[this.id]
    }
  },

  methods: {
    ...mapActions(['fetchCategory', 'fetchForums', 'fetchThreads', 'fetchUser'])
  },

  created () {
    this.fetchCategory({ id: this.id }).then(category => {
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
  }
}
</script>
