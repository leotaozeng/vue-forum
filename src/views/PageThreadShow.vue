<template>
  <!-- apply a v-if in the root element -->
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{name: 'ThreadEdit', params: {id: threadId}}"
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
      >{{ threadRepliesCount(threadId) }} replies by {{ contributorsCount }} contributors</span>
    </p>

    <PostList :posts="threadPosts"/>

    <PostEditor :threadId="threadId"/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapState, mapGetters, mapActions } from 'vuex'
import { countObjectProperties } from '../utils'

export default {
  mixins: [asyncDataStatus],

  components: {
    PostList,
    PostEditor
  },

  props: {
    threadId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState(['threads', 'posts', 'users']),

    ...mapGetters(['threadRepliesCount']),

    thread () {
      return this.threads[this.threadId]
    },

    threadPosts () {
      return Object.values(this.posts).filter(
        post => post.threadId === this.threadId
      )
    },

    user () {
      return this.users[this.thread.userId]
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
    // fetch the thread with this.threadId
    this.fetchThread({ id: this.threadId })
      .then(thread => {
        // fetch the user who created the thread
        this.fetchUser({ id: thread.userId })
        return thread
      })
      .then(thread => this.fetchPosts({ ids: thread.posts }))
      .then(posts =>
        Promise.all(posts.map(post => this.fetchUser({ id: post.userId })))
      )
      .then(this.asyncDataStatus_fetched)
  }
}
</script>
