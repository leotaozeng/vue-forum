<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{name: 'ThreadEdit', params: {id}}"
        class="btn-green btn-small"
        tag="button"
      >Edit Thread</router-link>
    </h1>

    <p>
      By
      <a href="#" class="link-unstyled">{{ user.name }}</a>,
      <AppDate :timestamp="thread.publishedAt"/>.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ repliesCount(id) }} replies by {{ contributorsCount }} contributors</span>
    </p>

    <PostList :posts="posts"/>

    <PostEditor :threadId="id"/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['repliesCount']),

    thread () {
      const { threads } = this.$store.state

      return threads[this.id]
    },

    posts () {
      const { posts } = this.$store.state

      return Object.values(posts).filter(post => post.threadId === this.id)
    },

    user () {
      const { authId, users } = this.$store.state

      return users[authId]
    },

    contributorsCount () {
      // find the replies
      // get the user ids
      // count the unique ids
      const replies = this.posts.filter(
        post => post['.key'] !== this.thread.firstPostId
      )

      const userIds = replies.map(reply => reply.userId)

      const uniqueIds = [...new Set(userIds)]

      return uniqueIds.length
    }
  },

  components: {
    PostList,
    PostEditor
  }
}
</script>
