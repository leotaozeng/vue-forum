<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Editing
      <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor
      ref="editor"
      :title="thread.title"
      :content="firstPost.text"
      @save="update"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ThreadEditor
  },

  mixins: [asyncDataStatus],

  props: {
    threadId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      updated: false
    }
  },

  methods: {
    ...mapActions('threads', ['fetchThread', 'updateThread']),

    ...mapActions('posts', ['fetchPost']),

    update ({ title, text }) {
      if (this.hasUnsavedChanges) {
        this.updateThread({ threadId: this.threadId, title, text }).then(
          thread => {
            this.updated = true
            this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
          }
        )
      } else {
        console.log('error')
      }
    },

    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  },

  computed: {
    ...mapState({
      threads: state => state.threads.items,
      posts: state => state.posts.items
    }),

    thread () {
      return this.threads[this.threadId]
    },

    firstPost () {
      const { firstPostId } = this.thread

      return this.posts[firstPostId]
    },

    hasUnsavedChanges () {
      const { title, content } = this.$refs.editor.form

      return title !== this.thread.title || content !== this.firstPost.text
    }
  },

  created () {
    this.fetchThread({ id: this.threadId })
      .then(thread => this.fetchPost({ id: thread.firstPostId }))
      .then(this.asyncDataStatus_fetched)
  },

  beforeRouteLeave (to, from, next) {
    if (this.hasUnsavedChanges && !this.updated) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )

      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>
