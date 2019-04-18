<template>
  <header class="header" id="header">
    <router-link :to="{name: 'Home'}" class="logo">
      <img src="../assets/images/svg/vueschool-logo.svg" alt="The Vue Forum logo">
    </router-link>

    <!-- Show these option only on mobile-->
    <div class="btn-hamburger">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul v-if="authUser">
        <li class="navbar-user">
          <a @click="switchDropdownStatus">
            <img class="avatar-small" :src="authUser.avatar" :alt="authUser.username">
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="../assets/images/svg/arrow-profile.svg"
                alt="icon"
              >
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{ 'active-drop': userDropDownOpen }">
            <div class="triangle-drop"></div>

            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{name: 'Profile'}">View profile</router-link>
              </li>

              <li class="dropdown-menu-item">
                <router-link :to="{name: 'Logout'}" title="Log out of your account">Log out</router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="navbar-item">
          <router-link :to="{name: 'Logout'}" title="Log out of your account">Log out</router-link>
        </li>

        <li class="navbar-item mobile-only">
          <router-link :to="{ name: 'Home'}">Home</router-link>
        </li>

        <!-- Show these options only on mobile -->
        <li class="navbar-item mobile-only">
          <router-link :to="{name: 'Profile'}">My Profile</router-link>
        </li>

        <li class="navbar-item mobile-only">
          <router-link :to="{name: 'Logout'}">Log out</router-link>
        </li>
      </ul>

      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{ name: 'Login', query: { redirect: $route.path } }">Log in</router-link>
        </li>

        <li class="navbar-item">
          <router-link :to="{ name: 'Signup', query: { redirect: $route.path } }">Sign up</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      userDropDownOpen: false
    }
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),

    switchDropdownStatus () {
      this.userDropDownOpen = !this.userDropDownOpen
    }
  },

  computed: {
    ...mapGetters({
      authUser: 'auth/authUser'
    })
  }
}
</script>
