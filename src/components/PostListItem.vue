<template>
  <div class="post">
    <div class="user-info">
      <a href="#"
         class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large"
             :src="user.avatar"
             alt="avatar">
      </a>

      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
    </div>

    <div class="post-content">
      <div>
        <p>{{ post.text }}</p>
      </div>
    </div>

    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from '@/utils'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    user () {
      return this.$store.state.sourceData.users[this.post.userId]
    },

    userPostsCount () {
      return countObjectProperties(this.user.posts)
    }

    // humanFriendlyDates () {
    //   return moment.unix(this.post.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
    // },

    // diffForHumans () {
    //   return moment.unix(this.post.publishedAt).fromNow()
    // }
  }

  // components: {
  //   AppDate
  // }
}
</script>
