<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <div class="profile-card">
        <p class="text-center">
          <img :src="user.avatar"
               :alt="user.username"
               class="avatar-xlarge">
        </p>

        <h1 class="username title">{{ user.usernameLower }}</h1>

        <p class="name text-lead">{{ user.name }}</p>

        <p class="text-justify">
          {{ user.bio ? user.bio : 'No bio specified.' }}
        </p>

        <span class="online">{{ user.usernameLower }} is online</span>

        <div class="stats">
          <span>{{ userPostsCount }} posts</span>
          <span>{{ userThreadsCount }} threads</span>
        </div>

        <hr>

        <p v-if="user.website"
           class="text-large text-center"><i class="fa fa-globe"></i>
          <router-link :to="user.webiste">{{ user.webiste }}</router-link>
        </p>
      </div>

      <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

      <div class="text-center">
        <hr>
        <a href="edit-profile.html"
           class="btn-green btn-small">Edit Profile</a>
      </div>
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
          {{ user.username }}'s recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostList from '@/components/PostList'

export default {
  computed: {
    userPostsCount () {
      return (this.user.posts ? Object.values(this.user.posts).length : 0)
    },

    userThreadsCount () {
      return (this.user.threads ? Object.values(this.user.threads).length : 0)
    },

    userPosts () {
      if (this.user.posts) {
        const { posts } = this.$store.state.sourceData

        return Object.values(posts).filter((post) => post.userId === this.user['.key'])
      } else {
        return []
      }
    },

    ...mapGetters({
      user: 'authUser'
    })
  },

  components: {
    PostList
  }
}
</script>

<style>
</style>
