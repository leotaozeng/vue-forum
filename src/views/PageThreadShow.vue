<template>
  <!-- apply a v-if in the root element -->
  <div v-if="thread && user" class="col-large push-top">
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
      >{{ threadRepliesCount(id) }} replies by {{ contributorsCount }} contributors</span>
    </p>

    <PostList :posts="posts"/>

    <PostEditor :threadId="id"/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { mapGetters, mapActions } from 'vuex'
import { countObjectProperties } from '../utils'

export default {
  components: {
    PostList,
    PostEditor
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['threadRepliesCount']),

    thread () {
      const { threads } = this.$store.state

      return threads[this.id]
    },

    posts () {
      const { posts } = this.$store.state

      return Object.values(posts).filter(post => post.threadId === this.id)
    },

    user () {
      const { users } = this.$store.state

      return users[this.thread.userId]
    },

    contributorsCount () {
      return countObjectProperties(this.thread.contributors)
      // find the replies
      // get the user ids
      // count the unique ids
      // const replies = this.posts.filter(
      //   post => post['.key'] !== this.thread.firstPostId
      // )

      // const userIds = replies.map(reply => reply.userId)

      // const uniqueIds = [...new Set(userIds)]

      // return uniqueIds.length
    }
  },

  methods: {
    ...mapActions(['fetchThread', 'fetchUser', 'fetchPost', 'fetchPosts'])
  },

  // I can access this.id in the following hook
  created () {
    // fetch the thread with this.id
    this.fetchThread({ id: this.id }).then(thread => {
      // fetch the user who created the thread
      this.fetchUser({ id: thread.userId })

      this.fetchPosts({
        ids: Object.keys(thread.posts)
      }).then(posts => {
        // receive an array with the post object
        posts.forEach(post => {
          // fetch the user who created the post
          this.fetchUser({ id: post.userId })
        })
      })
    })
  }
}
</script>
