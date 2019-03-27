<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="signup" class="card card-form">
        <h1 class="text-center">Create your Account</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" type="text" class="form-input" v-model="form.name" required>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" type="text" class="form-input" v-model="form.username" required>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" class="form-input" v-model="form.email" required>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" class="form-input" v-model="form.password" required>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input id="avatar" type="text" class="form-input" v-model="form.avatar" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Sign up</button>
        </div>
      </form>

      <div class="text-center push-top">
        <button class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
        avatar: null
      }
    }
  },

  methods: {
    ...mapActions(['signUpUserWithEmailAndPassword', 'createUser', 'fetchAuthUser']),

    signup () {
      const { name, username, email, password, avatar } = this.form

      // don't couple the component to Firebae
      this.signUpUserWithEmailAndPassword({ email, password })
        .then(user => {
          const { uid } = user.user

          return this.createUser({
            id: uid,
            name,
            username,
            email,
            password,
            avatar
          })
        })
        .then(user => this.$router.push({ name: 'Home' }))
    }
  },

  beforeCreate () {
    this.$emit('ready')
  }
}
</script>
