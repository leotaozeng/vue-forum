<template>
  <div v-if="thread && firstPost" class="col-full push-top">
    <h1>Editing
      <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor :title="thread.title" :content="firstPost.text" @save="update" @cancel="cancel"/>
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions(['fetchThread', 'fetchPost', 'updateThread']),

    update ({ title, text }) {
      this.updateThread({ id: this.id, title, text }).then(thread => {
        this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
      })
    },

    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  },

  computed: {
    thread () {
      const { threads } = this.$store.state

      return threads[this.id]
    },

    firstPost () {
      const { firstPostId } = this.thread
      const { posts } = this.$store.state

      return posts[firstPostId]
    }
  },

  created () {
    this.fetchThread({ id: this.id }).then(thread => {
      this.fetchPost({ id: thread.firstPostId })
    })
  },

  components: {
    ThreadEditor
  }
}
</script>

<style>
</style>
