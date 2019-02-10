<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <form @submit.prevent="create">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input type="text"
               id="thread_title"
               class="form-input"
               name="title"
               v-model="title">
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea id="thread_content"
                  class="form-input"
                  name="content"
                  rows="8"
                  cols="140"
                  v-model="content"></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
        <button class="btn btn-blue"
                type="submit"
                name="Publish">Publish</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      title: '',
      content: ''
    }
  },

  methods: {
    create () {
      const thread = {
        forumId: this.forum['.key'],
        title: this.title
      }

      this.$store.dispatch('createThread', { thread, text: this.content }).then(thread => {
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
  }
}
</script>

<style>
</style>
