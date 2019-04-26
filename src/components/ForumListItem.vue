<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link class="text-xlarge" :to="a">{{ forum.name }}</router-link>

      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCount }}</p>
      {{ showWord }}
    </div>

    <div v-if="thread && user" class="last-thread">
      <img class="avatar" :src="userAvatar" :alt="user.name">

      <div class="last-thread-details">
        <router-link
          :to="{ name: 'ThreadShow', params: { threadId: thread['.key'] } }"
        >{{ thread.title }}</router-link>

        <p class="text-xsmall">
          By
          <a vhref="profile.html">{{ user.name }}</a>,
          <AppDate :timestamp="thread.publishedAt"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppDate from '@/components/AppDate'
import { countObjectProperties } from '@/utils'
import { mapState } from 'vuex'

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

  computed: {
    ...mapState({
      threads: state => state.threads.items,
      users: state => state.users.items
    }),

    threadsCount () {
      return countObjectProperties(this.forum.threads)
    },

    thread () {
      const { threads } = this.forum

      return threads ? this.threads[Object.keys(threads)[0]] : null
    },

    user () {
      return this.thread ? this.users[this.thread.userId] : null
    },

    userAvatar () {
      const defaultAvatar = require('../assets/images/default.png')

      return this.user ? this.user.avatar : defaultAvatar
    },

    showWord () {
      return this.threadsCount <= 1 ? 'thread' : 'threads'
    },

    a () {
      const b = { name: 'Forum', params: { forumId: this.forum['.key'] } }
      const c = { name: 'Home' }

      return this.thread ? b : c
    }
  }
}
</script>
