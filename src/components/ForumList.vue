<template>
  <div>
    <ForumListItem
      v-for="forum in forums"
      :key="forum['.key']"
      :forum="forum"
    />
  </div>
</template>

<script>
import ForumListItem from './ForumListItem'

export default {
  props: {
    forums: {
      type: Array,
      required: true
    }
  },

  components: {
    ForumListItem
  }
}
</script>

<style></style>
