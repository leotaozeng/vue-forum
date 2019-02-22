<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <ThreadEditor @save="create"
                  @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'

export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  methods: {
    create ({ title, text }) {
      this.$store.dispatch('createThread', { forumId: this.forumId, title, text }).then(thread => {
        this.$router.push({ name: 'ThreadShow', params: { id: thread['.key'] } })
      })
    },

    cancel () {
      this.$router.push({ name: 'Forum', params: { id: this.forumId } })
    }
  },

  computed: {
    forum () {
      const { forums } = this.$store.state

      return forums[this.forumId]
    }
  },

  components: {
    ThreadEditor
  }
}
</script>

<style>
</style>
