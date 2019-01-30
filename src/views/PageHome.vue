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
      const { sourceData } = this.$store.state

      return Object.values(sourceData.categories)
    }
  }
}
</script>
