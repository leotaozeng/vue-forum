<template>
  <div class="thread">
    <div>
      <p>
        <router-link
          :to="{ name: 'ThreadShow', params: { threadId: thread['.key'] }}"
        >{{ thread.title }}</router-link>
      </p>

      <p class="text-faded text-xsmall">
        By
        <a href="profile.html">{{ threadUser.name }}</a>,
        <AppDate :timestamp="thread.publishedAt"/>.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ threadRepliesCount(thread['.key']) }} reply</p>

      <!-- <img
        class="avatar-medium"
        src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
        alt
      >

      <div>
        <p class="text-xsmall">
          <a href="profile.html">{{ lastPostUser.name }}</a>
        </p>

        <AppDate v-if="thread" :timestamp="lastPost.publishedAt"/>
      </div>-->
    </div>
  </div>
</template>

<script>
import AppDate from '@/components/AppDate'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    AppDate
  },

  props: {
    thread: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState(['posts', 'users']),

    ...mapGetters(['threadRepliesCount']),

    lastPost () {
      return this.posts[this.thread.lastPostId]
    },

    lastPostUser () {
      return this.users[this.lastPost.userId]
    },

    threadUser () {
      return this.users[this.thread.userId]
    }
  }
}
</script>
