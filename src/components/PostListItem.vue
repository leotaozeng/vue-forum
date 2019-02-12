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
      <div v-if="!editing">
        <p>{{ post.text }}</p>
      </div>

      <PostEditor v-else
                  :post="post"
                  @update="updatePost" />

      <a @click="editing = true"
         v-if="!editing"
         style="margin-left: auto;"
         class="link-unstyled"
         title="Make a change"><i class="fa fa-pencil"></i></a>
    </div>

    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from '@/utils'
import PostEditor from './PostEditor'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      editing: false
    }
  },

  methods: {
    updatePost ({ text }) {
      this.$store.dispatch({
        type: 'updatePost',
        id: this.post['.key'],
        text
      }).then(() => {
        this.editing = false
      })
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
  },

  components: {
    PostEditor
  }
}
</script>
