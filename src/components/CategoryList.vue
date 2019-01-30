<template>
  <div>
    <CategoryListItem v-for="category in catgories"
                      :key="category['.key']"
                      :category="category" />
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'

export default {
  props: {
    catgories: {
      type: Array,
      required: true
    }
  },

  components: {
    CategoryListItem
  }
}
</script>
