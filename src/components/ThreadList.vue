<template>
  <div class="thread-list">
    <ul>
      <li v-for="thread in threads" :key="thread['.key']">
        <ThreadListItem :thread="thread"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ThreadListItem from '@/components/ThreadListItem'

export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },

  components: {
    ThreadListItem
  }
}
</script>
