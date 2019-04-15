<template>
  <div v-if="user && post" class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="avatar">
      </a>

      <p class="desktop-only text-small">{{ userThreadsCount(post.userId) }} threads</p>

      <p class="desktop-only text-small">{{ userPostsCount(post.userId) }} posts</p>
    </div>

    <div class="post-content">
      <PostEditor v-if="editing" :post="post" @update="editing = false" @cancel="editing = false"/>

      <template v-else>
        <p>{{ post.text }}</p>

        <a
          @click="editing = true"
          style="margin-left: auto;"
          class="link-unstyled"
          title="Make a change"
        >
          <i class="fa fa-pencil"></i>
        </a>
      </template>
    </div>

    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    PostEditor
  },

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

  computed: {
    ...mapState({
      users: state => state.users.items
    }),

    ...mapGetters(['userPostsCount', 'userThreadsCount']),

    user () {
      return this.users[this.post.userId]
    }

    // humanFriendlyDates () {
    //   return moment.unix(this.post.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
    // },

    // diffForHumans () {
    //   return moment.unix(this.post.publishedAt).fromNow()
    // }
  }
}
</script>
