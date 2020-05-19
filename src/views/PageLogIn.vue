<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form
        @submit.prevent="login"
        @keyup.enter="login"
        class="card card-form"
        autocomplete="off"
      >
        <h1 class="text-center">Log Into Vue Forum</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            class="form-input"
            v-model.trim.lazy="form.email"
            @blur="$v.form.email.$touch()"
          />
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error"
              >This field is required</span
            >
            <span v-else-if="!$v.form.email.email" class="form-error"
              >This is not a valid email address</span
            >
          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-input"
            v-model.lazy="form.password"
            @blur="$v.form.password.$touch()"
          />
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error"
              >This field is required</span
            >
            <span v-else-if="!$v.form.password.minLength" class="form-error"
              >The password should be at least 6 characters long</span
            >
          </template>
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="push-top text-center">
          New to Vue Forum?&nbsp;
          <router-link :to="{ name: 'Signup' }">Create an account</router-link>
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
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },

  validations: {
    form: {
      email: {
        required,
        email
      },

      password: {
        required,
        minLength: minLength(6)
      }
    }
  },

  methods: {
    ...mapActions('auth', ['signInWithEmailAndPassword', 'signInWithGoogle']),

    login() {
      this.$v.form.$touch()

      if (this.$v.form.$invalid) {
        alert('error')
      } else {
        const { email, password } = this.form

        this.signInWithEmailAndPassword({ email, password }).then(() =>
          this.successRedirect()
        )
      }
    },

    loginWithGoogle() {
      this.signInWithGoogle().then(() => this.successRedirect())
    },

    successRedirect() {
      // The $route is the active route
      // If the query param is not defined, set the value of redirect to a default path
      const redirect = this.$route.query.redirect || { name: 'Home' }

      this.$router.push(redirect)
    }
  },

  beforeCreate() {
    this.$emit('ready')
  }
}
</script>
