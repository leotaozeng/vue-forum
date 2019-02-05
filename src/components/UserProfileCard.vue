<template>
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
      <router-link :to="{name: 'ProfileEdit'}"
         class="btn-green btn-small">Edit Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userPostsCount: {
      type: Number,
      required: true
    },

    userThreadsCount: {
      type: Number,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
