<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="signin" class="card card-form">
        <h1 class="text-center">Sign in to Vue Forum</h1>

        <div class="form-group">
          <label for="email">Email address</label>
          <input id="email" type="text" class="form-input" v-model="form.email" required>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" class="form-input" v-model="form.password" required>
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Sign in</button>
        </div>

        <div class="push-top text-center">
          New to Vue Forum?&nbsp;
          <router-link :to="{ name: 'SignUp' }">Create an account.</router-link>
        </div>
      </form>

      <div class="push-top text-center">
        <button class="btn-red btn-xsmall" @click="signinWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
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
        email: null,
        password: null
      }
    }
  },

  methods: {
    ...mapActions(['signInWithEmailAndPassword', 'signInWithGoogle']),

    signin () {
      const { email, password } = this.form

      this.signInWithEmailAndPassword({ email, password })
        .then(user => this.$router.push({ name: 'Home' }))
    },

    signinWithGoogle () {
      this.signInWithGoogle()
        .then(user => this.$router.push({ name: 'Home' }))
    }
  },

  beforeCreate () {
    this.$emit('ready')
  }
}
</script>
