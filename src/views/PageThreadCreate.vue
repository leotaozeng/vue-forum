<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in
      <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor ref="editor" @save="publish" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
// import store from '@/store/index'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [asyncDataStatus],

  components: {
    ThreadEditor
  },

  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      published: false
    }
  },

  methods: {
    ...mapActions({
      fetchForum: 'forums/fetchForum',
      createThread: 'threads/createThread'
    }),

    publish({ title, text }) {
      // title and content all must be not empty
      if (this.hasNoEmpty) {
        this.createThread({ forumId: this.forumId, title, text }).then(
          thread => {
            this.published = true
            this.$router.push({
              name: 'ThreadShow',
              params: { threadId: thread['.key'] }
            })
          }
        )
      }
    },

    cancel() {
      this.$router.push({ name: 'Forum', params: { forumId: this.forumId } })
    }
  },

  computed: {
    ...mapState({
      forums: state => state.forums.items
    }),

    forum() {
      return this.forums[this.forumId]
    },

    hasNoEmpty() {
      const { title, content } = this.$refs.editor.form

      return title && content
    },

    hasUnsavedChanges() {
      const { title, content } = this.$refs.editor.form

      return title || content
    }
  },

  created() {
    this.fetchForum({ id: this.forumId }).then(this.asyncDataStatus_fetched)
  },

  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges && !this.published) {
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
