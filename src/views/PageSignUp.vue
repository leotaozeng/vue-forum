<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="signup" @keyup.enter="signup" class="card card-form">
        <h1 class="text-center">Get Started for Free</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            type="text"
            class="form-input"
            v-model.trim="form.name"
            @blur="$v.form.name.$touch()"
          >
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            class="form-input"
            v-model.trim="form.username"
            @blur="$v.form.username.$touch()"
          >
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            class="form-input"
            v-model="form.email"
            @blur="$v.form.email.$touch()"
          >
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.email.email" class="form-error">This is not a valid email address</span>
          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-input"
            v-model="form.password"
            @blur="$v.form.password.$touch()"
          >
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span
              v-if="!$v.form.password.minLength"
              class="form-error"
            >The password should be at least 6 characters long</span>
          </template>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            id="avatar"
            type="text"
            class="form-input"
            v-model="form.avatar"
            @blur="$v.form.avatar.$touch()"
          >
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Sign up</button>
        </div>

        <div class="text-center push-top">
          Have an account?
          <router-link :to="{name: 'Login'}">Log in</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        name: '',
        username: '',
        email: null,
        password: null,
        avatar: null
      }
    }
  },

  validations: {
    form: {
      name: {
        required
      },

      username: {
        required,
        isUnique (value) {
          // simulate async call, fail for all logins with even length
          return new Promise((resolve, reject) => {
            firebase.database().ref('users')
          })
        }
      },

      email: {
        required,
        email
      },

      password: {
        required,
        minLength: minLength(6)
      },

      avatar: {}
    }
  },

  methods: {
    ...mapActions({
      signUpUserWithEmailAndPassword: 'auth/signUpUserWithEmailAndPassword',
      createUser: 'users/createUser'
    }),

    signup () {
      const { name, username, email, password, avatar } = this.form

      this.$v.form.$touch()

      if (!this.$v.form.$invalid) {
        alert('error')
      } else {
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
          .then(user => this.successRedirect())
          .catch(error => console.log(error))
      }
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
