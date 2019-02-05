<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar"
             :alt="user.username"
             class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input type="text"
               v-model="activeUser.usernameLower"
               placeholder="Username"
               class="form-input text-lead text-bold">
      </div>

      <div class="form-group">
        <input type="text"
               v-model="activeUser.name"
               placeholder="Full Name"
               class="form-input text-lead">
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea class="form-input"
                  id="user_bio"
                  v-model="activeUser.bio"
                  placeholder="Write a few words about yourself."></textarea>
      </div>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label class="form-label"
               for="user_website">Website</label>
        <input autocomplete="off"
               class="form-input"
               id="user_website"
               v-model="activeUser.webiste">
      </div>

      <div class="form-group">
        <label class="form-label"
               for="user_email">Email</label>
        <input autocomplete="off"
               class="form-input"
               id="user_email"
               v-model="activeUser.email">
      </div>

      <div class="form-group">
        <label class="form-label"
               for="user_location">Location</label>
        <input autocomplete="off"
               class="form-input"
               id="user_location"
               v-model="activeUser.location">
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost"
                @click="cancel">Cancel</button>
        <button type="submit"
                class="btn-blue"
                @click.prevent="save">Save</button>
      </div>
    </div>

    <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
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
  },

  data () {
    return {
      activeUser: { ...this.user }
    }
  },

  methods: {
    cancel () {
      this.$router.push({ name: 'Profile' })
    },

    save () {
      this.$store.dispatch('updateUser', { ...this.activeUser })
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>

<style>
</style>
