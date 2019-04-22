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
            v-model.trim.lazy="form.username"
            @blur="$v.form.username.$touch()"
          >
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry! this username is taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            class="form-input"
            v-model.trim.lazy="form.email"
            @blur="$v.form.email.$touch()"
          >
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span
              v-else-if="!$v.form.email.email"
              class="form-error"
            >This is not a valid email address</span>
            <span v-else-if="!$v.form.email.unique" class="form-error">Sorry! this email is taken</span>
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
            v-model.trim.lazy="form.avatar"
            @blur="$v.form.avatar.$touch()"
          >
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error">The supplied URL is invalid</span>
            <span v-else-if="!$v.form.avatar.supportedImageFile" class="form-error">
              This file type is not supported by our system.
              <br>Supported file types: .jpg, .png, .gif, .jpeg, .svg
            </span>
            <span
              v-else-if="!$v.form.avatar.responseOk"
              class="form-error"
            >The supplied image can't be found</span>
          </template>
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
import { database } from '@/firebase.config.js'
import { mapActions } from 'vuex'
import { required, email, minLength, url } from 'vuelidate/lib/validators'
import { Promise } from 'q'

export default {
  data () {
    return {
      form: {
        name: '',
        username: '',
        avatar: '',
        email: null,
        password: null
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
        unique (value) {
          // simulate async call, fail for all logins with even length
          return new Promise((resolve, reject) => {
            database
              .ref('users')
              .orderByChild('usernameLower')
              .equalTo(value.toLowerCase())
              .once('value', snapshot => resolve(!snapshot.exists()))
          })
        }
      },

      email: {
        required,
        email,
        unique (value) {
          // simulate async call, fail for all logins with even length
          return new Promise((resolve, reject) => {
            database
              .ref('users')
              .orderByChild('email')
              .equalTo(value.toLowerCase())
              .once('value', snapshot => resolve(!snapshot.exists()))
          })
        }
      },

      password: {
        required,
        minLength: minLength(6)
      },

      // end with a suffix like .jpg or .png or another file type.
      avatar: {
        url,
        supportedImageFile (value) {
          const supported = ['jpg', 'jpeg', 'gif', 'png', 'svg']
          const suffix = value.split('.').pop()

          return supported.includes(suffix)
        },
        responseOk (value) {
          return new Promise((resolve, reject) => {
            fetch(value)
              .then(res => resolve(res.ok))
              // The thing with fetch is that it won't reject if the URL is not found.
              .catch(() => resolve(false))
          })
        }
      }
    }
  },

  methods: {
    ...mapActions({
      signUpUserWithEmailAndPassword: 'auth/signUpUserWithEmailAndPassword',
      createUser: 'users/createUser'
    }),

    signup () {
      this.$v.form.$touch()

      if (this.$v.form.$invalid) {
        alert('error')
      } else {
        // do sign up logic here
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
