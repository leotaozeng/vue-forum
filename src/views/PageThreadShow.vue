<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}

      <router-link :to="{name: 'ThreadEdit', params: {id}}"
                   class="btn-green btn-small"
                   tag="button">Edit Thread</router-link>
    </h1>

    <p>
      By <a href="#"
         class="link-unstyled">{{ user.name }}</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span style="float:right; margin-top: 2px;"
            class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>

    <PostList :posts="posts" />

    <PostEditor @create="addPost" />
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
      const newPost = {
        text,
        threadId: this.id
      }

      this.$store.dispatch('createPost', newPost)
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
    },

    user () {
      const { authId, users } = this.$store.state.sourceData

      return users[authId]
    }
  },

  components: {
    PostList,
    PostEditor
  }
}
</script>
