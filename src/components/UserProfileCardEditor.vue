<template>
  <div class="col-3 push-top">
    <form class="profile-card" @submit.prevent="save" autocomplete="off">
      <p class="text-center">
        <img :src="user.avatar" :alt="user.username" class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
          v-model.trim.lazy="activeUser.username"
          @blur="$v.activeUser.username.$touch()"
        >
        <template v-if="$v.activeUser.username.$error">
          <span v-if="!$v.activeUser.username.required" class="form-error">This field is required</span>
          <span
            v-else-if="!$v.activeUser.username.unique"
            class="form-error"
          >Sorry! this username is taken</span>
        </template>
      </div>

      <div class="form-group">
        <input
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
          v-model.trim.lazy="activeUser.name"
          @blur="$v.activeUser.name.$touch()"
        >
        <template v-if="$v.activeUser.name.$error">
          <span v-if="!$v.activeUser.name.required" class="form-error">This field is required</span>
        </template>
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          placeholder="Write a few words about yourself."
          class="form-input"
          id="user_bio"
          v-model.trim="activeUser.bio"
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ userPostsCount(user['.key']) }} posts</span>
        <span>{{ userThreadsCount(user['.key']) }} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input class="form-input" id="user_website" v-model.trim="activeUser.webiste">
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          class="form-input"
          id="user_email"
          v-model.trim.lazy="activeUser.email"
          @blur="$v.activeUser.email.$touch()"
        >
        <template v-if="$v.activeUser.email.$error">
          <span v-if="!$v.activeUser.email.required" class="form-error">This field is required</span>
          <span v-else-if="!$v.activeUser.email.unique" class="form-error">Sorry! this email is taken</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input class="form-input" id="user_location" v-model.trim="activeUser.location">
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>

    <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { uniqueUsername, uniqueEmail } from '@/utils/validators'

export default {
  props: {
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

  validations: {
    activeUser: {
      username: {
        required,
        unique (value) {
          if (value.toLowerCase() === this.user.usernameLower) {
            return true
          } else {
            return uniqueUsername(value)
          }
        }
      },

      name: {
        required
      },

      email: {
        required,
        unique (value) {
          if (value.toLowerCase() === this.user.email.toLowerCase()) {
            return true
          } else {
            return uniqueEmail(value)
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      updateUser: 'users/updateUser'
    }),

    cancel () {
      this.$router.push({ name: 'Profile' })
    },

    save () {
      this.$v.activeUser.$touch()

      if (this.$v.activeUser.$invalid) {
        alert('error')
      } else {
        this.updateUser(this.activeUser).then(() =>
          this.$router.push({ name: 'Profile' })
        )
      }
    }
  },

  computed: {
    ...mapGetters('users', ['userPostsCount', 'userThreadsCount'])
  }
}
</script>
