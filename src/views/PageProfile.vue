<template>
  <div class="flex-grid">
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
import { mapGetters } from 'vuex'

export default {
  props: {
    edit: {
      type: Boolean
    }
  },

  computed: {
    userPosts () {
      if (this.user.posts) {
        const { posts } = this.$store.state

        return Object.values(posts).filter(
          post => post.userId === this.user['.key']
        )
      } else {
        return []
      }
    },

    ...mapGetters({
      user: 'authUser'
    })
  },

  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  }
}
</script>
