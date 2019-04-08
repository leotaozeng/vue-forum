<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Editing
      <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor :title="thread.title" :content="firstPost.text" @save="update" @cancel="cancel"/>
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [asyncDataStatus],

  props: {
    threadId: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions(['fetchThread', 'fetchPost', 'updateThread']),

    update ({ title, text }) {
      this.updateThread({ threadId: this.threadId, title, text }).then(thread =>
        this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
      )
    },

    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  },

  computed: {
    ...mapState(['threads', 'posts']),

    thread () {
      return this.threads[this.threadId]
    },

    firstPost () {
      const { firstPostId } = this.thread

      return this.posts[firstPostId]
    }
  },

  created () {
    this.fetchThread({ id: this.threadId })
      .then(thread => this.fetchPost({ id: thread.firstPostId }))
      .then(this.asyncDataStatus_fetched)
  },

  components: {
    ThreadEditor
  }
}
</script>

<style>
</style>
