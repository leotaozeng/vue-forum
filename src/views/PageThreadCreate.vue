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

  methods: {
    ...mapActions(['fetchForum', 'createThread']),

    create ({ title, text }) {
      this.createThread({ forumId: this.forumId, title, text }).then(thread =>
        this.$router.push({
          name: 'ThreadShow',
          params: { threadId: thread['.key'] }
        })
      )
    },

    cancel () {
      this.$router.push({ name: 'Forum', params: { forumId: this.forumId } })
    }
  },

  computed: {
    ...mapState(['forums']),

    forum () {
      return this.forums[this.forumId]
    }
  },

  created () {
    this.fetchForum({ id: this.forumId }).then(this.asyncDataStatus_fetched)
  },

  beforeRouteLeave (to, from, next) {
    console.log(this)
    if (!this.title || !this.text) {
      next()
    } else {
      const confirmed = window.confirm(
        'Are you sure you want to leave? Unsaved changes will be lost.'
      )

      if (confirmed) {
        next()
      }
    }
  }
}
</script>

<style>
</style>
