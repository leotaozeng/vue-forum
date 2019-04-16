<template>
  <div v-if="user" class="flex-grid">
    <UserProfileCard v-if="!edit" :user="user"/>

    <UserProfileCardEditor v-else :user="user"/>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.username }}'s recent activity</span>

        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    edit: {
      type: Boolean
    }
  },

  computed: {
    ...mapState({
      posts: state => state.posts.items
    }),

    ...mapGetters({
      user: 'auth/authUser'
    }),

    userPosts () {
      if (this.user.posts) {
        return Object.values(this.posts).filter(
          post => post.userId === this.user['.key']
        )
      } else {
        return []
      }
    }
  },

  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  beforeUpdate () {
    this.$emit('ready')
  }
}
</script>
