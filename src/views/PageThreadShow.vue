<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#"
         class="link-unstyled">Robin</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span style="float:right; margin-top: 2px;"
            class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>

    <PostList :posts="posts" />

    <PostEditor @save-post="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  methods: {
    addPost ({ text }) {
      const postId = 'greatPost' + Math.random()
      const newPost = {
        publishedAt: Math.floor(Date.now() / 1000),
        text,
        threadId: this.id,
        userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
        '.key': postId
      }

      this.$store.dispatch('addPost', newPost)
      this.$store.dispatch('addPostToThread', newPost)
      this.$store.dispatch('addPostToUser', newPost)
    }
  },

  computed: {
    thread () {
      const { sourceData } = this.$store.state

      return sourceData.threads[this.id]
    },

    posts () {
      const { posts } = this.$store.state.sourceData

      return Object.values(posts).filter((post) => post.threadId === this.id)
    }
  },

  components: {
    PostList,
    PostEditor
  }
}
</script>
