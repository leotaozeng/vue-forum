<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{name: 'Forum', params: { forumId: forum['.key'] }}"
      >{{ forum.name }}</router-link>

      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCount }}</p>
      {{ showWord }}
    </div>

    <div class="last-thread">
      <img class="avatar" src="https://i.imgur.com/WPSrfGm.jpg" alt>

      <div class="last-thread-details">
        <a v-if="thread" href="thread.html">{{ thread.title }}</a>

        <p class="text-xsmall">
          By
          <a v-if="user" href="profile.html">{{ user.name }}</a>,
          <AppDate v-if="thread" :timestamp="thread.publishedAt"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppDate from '@/components/AppDate'
import { countObjectProperties } from '@/utils'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AppDate
  },

  props: {
    forum: {
      type: Object,
      required: true
    }
  },

  methods: {
    // the mapActions helper
    ...mapActions(['fetchThreads', 'fetchUser'])
  },

  computed: {
    ...mapState(['threads', 'users']),

    threadsCount () {
      return countObjectProperties(this.forum.threads)
    },

    thread () {
      const { threads } = this.forum

      if (threads) {
        return this.threads[Object.keys(threads)[0]]
      }

      return 0
    },

    user () {
      return this.thread ? this.users[this.thread.userId] : 'aa'
    },

    showWord () {
      return this.threadsCount <= 1 ? 'thread' : 'threads'
    }
  }
}
</script>

<style>
</style>
