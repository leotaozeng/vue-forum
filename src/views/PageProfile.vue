<template>
  <div v-if="authUser" class="flex-grid">
    <UserProfileCard v-if="!edit" :user="authUser"/>

    <UserProfileCardEditor v-else :user="authUser"/>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ authUser.username }}'s recent activity</span>

        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="userPosts({ resourceId: 'userId', id: authUser['.key'] })"/>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  mixins: [asyncDataStatus],

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
      authUser: 'auth/authUser',
      userPosts: 'posts/posts'
    })
  },

  methods: {
    ...mapActions({
      fetchPosts: 'posts/fetchPosts'
    })
  },

  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  created () {
    console.log(!!this.authUser.posts)
    if (this.authUser.posts) {
      this.fetchPosts({ ids: this.authUser.posts }).then(
        this.asyncDataStatus_fetched
      )
    } else {
      this.asyncDataStatus_fetched()
    }
  }
}
</script>
