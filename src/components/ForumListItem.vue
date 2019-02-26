<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{name: 'Forum', params: { id: forum['.key'] }}"
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
        <a href="thread.html">{{ thread.title }}</a>

        <p class="text-xsmall">
          By
          <a href="profile.html">{{ user.name }}</a>,
          <AppDate :timestamp="thread.publishedAt"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppDate from '@/components/AppDate'
import { countObjectProperties } from '@/utils'

export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },

  computed: {
    threadsCount () {
      return countObjectProperties(this.forum.threads)
    },

    thread () {
      const { threads } = this.$store.state

      if (this.forum.threads) {
        return threads[Object.values(this.forum.threads)[0]]
      }
      return 0
    },

    user () {
      const { users } = this.$store.state

      return users[this.thread.userId]
    },

    showWord () {
      return this.threadsCount <= 1 ? 'thread' : 'threads'
    }
  },

  components: {
    AppDate
  }
}
</script>

<style>
</style>
