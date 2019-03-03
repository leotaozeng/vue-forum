<template>
  <div v-if="category" class="col-full push-top">
    <h1>{{ category.name }}</h1>

    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    category () {
      const { categories } = this.$store.state

      return categories[this.id]
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
  },

  components: {
    CategoryListItem
  }
}
</script>
