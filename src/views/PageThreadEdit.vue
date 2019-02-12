<template>
  <div class="col-full push-top">
    <h1>Editing <i>{{ thread.title }}</i></h1>

    <ThreadEditor :title="thread.title"
                  :content="firstPost.text"
                  @save="update"
                  @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  methods: {
    update ({ title, text }) {
      this.$store.dispatch('updateThread', { id: this.id, title, text }).then(thread => {
        this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
      })
    },

    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  },

  computed: {
    thread () {
      const { threads } = this.$store.state.sourceData

      return threads[this.id]
    },

    firstPost () {
      const { firstPostId } = this.thread
      const { posts } = this.$store.state.sourceData

      return posts[firstPostId]
    }
  },

  components: {
    ThreadEditor
  }
}
</script>

<style>
</style>
