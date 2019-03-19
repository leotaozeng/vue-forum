<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>{{ category.name }}</h1>

    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [asyncDataStatus],

  components: {
    CategoryListItem
  },

  props: {
    categoryId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState(['categories']),

    category () {
      return this.categories[this.categoryId]
    }
  },

  methods: {
    ...mapActions(['fetchCategory', 'fetchForums'])
  },

  created () {
    // action
    this.fetchCategory({ id: this.categoryId })
      .then(category => this.fetchForums({ ids: category.forums }))
      .then(this.asyncDataStatus_fetched)
  }
}
</script>
