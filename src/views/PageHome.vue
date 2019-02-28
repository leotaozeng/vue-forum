<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :catgories="catgories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'

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

  beforeCreate () {
    console.log('📡 beforeCreate', this.catgories)
  },

  // Here, we have access to component's data and computed properties.
  created () {
    console.log('📡 created', this.catgories, this.$el)
  },

  beforeMount () {
    console.log('📡 beforeMount', this.catgories, this.$el)
  },

  mounted () {
    console.log('📡 mounted', this.catgories, this.$el)
  }
}
</script>
