<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>{{ category.name }}</h1>

    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import { mapState, mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

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
    this.fetchCategory({ id: this.id }).then(category =>
      Promise.all(this.fetchForums({ ids: category.forums }))
    ).then((a) => {
      console.log(a)
    })
  }
}
</script>
