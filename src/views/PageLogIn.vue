<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="login" @keyup.enter="login" class="card card-form">
        <h1 class="text-center">Log Into Vue Forum</h1>

        <div class="form-group">
          <label for="email">Email address</label>
          <input id="email" type="text" class="form-input" v-model="form.email">
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" class="form-input" v-model="form.password">
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="push-top text-center">
          New to Vue Forum?&nbsp;
          <router-link :to="{ name: 'Signup' }">Create an account free</router-link>
        </div>
      </form>

      <div class="push-top text-center">
        <button class="btn-red btn-xsmall" @click="loginWithGoogle">
          <i class="fa fa-google fa-btn"></i>Log In with Google
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
    ...mapActions({
      signInWithEmailAndPassword: 'auth/signInWithEmailAndPassword',
      signInWithGoogle: 'auth/signInWithGoogle'
    }),

    login () {
      const { email, password } = this.form

      this.signInWithEmailAndPassword({ email, password }).then(() =>
        this.successRedirect()
      )
    },

    loginWithGoogle () {
      this.signInWithGoogle().then(() => this.successRedirect())
    },

    successRedirect () {
      // The $route is the active route
      // If the query param is not defined, set the value of redirect to a default path
      const redirect = this.$route.query.redirect || { name: 'Home' }

      this.$router.push(redirect)
    }
  },

  beforeCreate () {
    this.$emit('ready')
  }
}
</script>
