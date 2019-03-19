<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in
      <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor @save="create" @cancel="cancel"/>
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapActions } from 'vuex'

export default {
  mixins: [asyncDataStatus],

  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions(['fetchForum', 'createThread']),

    create ({ title, text }) {
      this.createThread({ forumId: this.forumId, title, text }).then(thread =>
        this.$router.push({
          name: 'ThreadShow',
          params: { id: thread['.key'] }
        })
      )
    },

    cancel () {
      this.$router.push({ name: 'Forum', params: { forumId: this.forumId } })
    }
  },

  computed: {
    forum () {
      const { forums } = this.$store.state

      return forums[this.forumId]
    }
  },
  // lifecycle hook
  created () {
    this.fetchForum({ id: this.forumId }).then(this.asyncDataStatus_fetched)
  },

  components: {
    ThreadEditor
  }
}
</script>

<style>
</style>
