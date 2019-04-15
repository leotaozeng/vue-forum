<template>
  <header class="header" id="header">
    <router-link :to="{name: 'Home'}" class="logo">
      <img src="../assets/images/svg/vueschool-logo.svg">
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
      <ul v-if="user">
        <li class="navbar-user">
          <a @click="switchDropdownStatus">
            <img class="avatar-small" :src="user.avatar" :alt="user.username">
            <span>
              {{ user.name }}
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
      </ul>

      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{ name: 'Login' }">Log in</router-link>
        </li>

        <li class="navbar-item">
          <router-link :to="{ name: 'Signup' }">Sign up</router-link>
        </li>
      </ul>

      <ul>
        <li class="navbar-item">
          <router-link :to="{ name: 'Home'}">Home</router-link>
        </li>
        <li class="navbar-item">
          <a href="category.html">Category</a>
        </li>
        <li class="navbar-item">
          <a href="forum.html">Forum</a>
        </li>
        <li class="navbar-item">
          <a href="thread.html">Thread</a>
        </li>
        <!-- Show these option only on mobile-->
        <li class="navbar-item">
          <router-link :to="{name: 'Profile'}">My Profile</router-link>
        </li>
        <li class="navbar-item mobile-only">
          <a href="#">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      userDropDownOpen: false
    }
  },

  methods: {
    switchDropdownStatus () {
      this.userDropDownOpen = !this.userDropDownOpen
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/authUser'
    })
  }
}
</script>
