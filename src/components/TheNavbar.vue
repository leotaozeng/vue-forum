<template>
  <header class="header" id="header">
    <router-link :to="{name: 'Home'}" class="logo">
      <img src="../assets/images/svg/vueschool-logo.svg" alt="The Vue Forum logo">
    </router-link>

    <!-- Show these option only on mobile-->
    <label class="btn-hamburger" for="menustate">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </label>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar" :class="{'navbar-open': mobileNavbarOpen}">
      <ul v-if="authUser">
        <li class="navbar-user">
          <a v-click-outside="switchDropdownStatus">
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
          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
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

        <!-- mobile-only -->
        <li class="navbar-mobile-item">
          <router-link :to="{ name: 'Home'}">Home</router-link>
        </li>

        <!-- Show these options only on mobile -->
        <li class="navbar-item mobile-only">
          <router-link :to="{name: 'Profile'}">My Profile</router-link>
        </li>
      </ul>

      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{ name: 'Login', query: hasQuery }">Log in</router-link>
        </li>

        <li class="navbar-item">
          <router-link :to="{ name: 'Signup', query: hasQuery }">Sign up</router-link>
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
      userDropdownOpen: false,
      mobileNavbarOpen: false
    }
  },

  methods: {
    switchDropdownStatus (status) {
      if (typeof status === 'boolean') {
        this.userDropdownOpen = status
      } else {
        this.userDropdownOpen = !this.userDropdownOpen
      }
    },

    switchNavbarStatus () {
      this.mobileNavbarOpen = !this.mobileNavbarOpen
    }
  },

  computed: {
    ...mapGetters({
      authUser: 'auth/authUser'
    }),

    hasQuery () {
      return this.$route.name !== 'Home' &&
        this.$route.name !== 'Signup' &&
        this.$route.name !== 'Login'
        ? { redirect: this.$route.path }
        : null
    }
  },

  directives: {
    clickOutside: {
      bind: (el, binding) => {
        el.__ClickOutSideHandler__ = event => {
          let targetElement = event.target

          do {
            if (targetElement === el) {
              // This is a click inside. Do nothing, just return.
              binding.value()
              return
            }
            // Go up the DOM
            targetElement = targetElement.parentNode
          } while (targetElement)

          // This is a click outside.
          binding.value(false)
        }

        document.addEventListener('click', el.__ClickOutSideHandler__)
      },

      unbind: el => {
        document.removeEventListener('click', el.__ClickOutSideHandler__)
        el.__ClickOutSideHandler__ = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .menustate {
    display: none;
  }
</style>
