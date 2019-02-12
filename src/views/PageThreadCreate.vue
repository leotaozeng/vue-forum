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
      const thread = {
        forumId: this.forum['.key'],
        title
      }

      this.$store.dispatch('createThread', { thread, text }).then(thread => {
        this.$router.push({ name: 'ThreadShow', params: { id: thread['.key'] } })
      })
    },

    cancel () {
      this.$router.push({ name: 'Forum', params: { id: this.forum['.key'] } })
    }
  },

  computed: {
    forum () {
      const { forums } = this.$store.state.sourceData

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
