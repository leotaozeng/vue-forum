<template>
  <header id="header" class="header">
    <div class="header-wrapper">
      <router-link :to="{ name: 'Home' }" class="logo">
        <img
          src="../assets/images/svg/vueschool-logo.svg"
          alt="The Vue Forum logo"
        />
      </router-link>

      <!-- Show these option only on mobile-->
      <div class="btn-hamburger" @touchend="switchNavbarStatus">
        <!-- use .btn-humburger-active to open the menu -->
        <div class="top bar"></div>
        <div class="middle bar"></div>
        <div class="bottom bar"></div>
      </div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar" :class="{ 'navbar-open': mobileNavbarOpen }">
      <ul v-if="authUser" class="navbar-list">
        <li class="navbar-user" v-if="!isMobileDevice">
          <a v-click-outside="switchDropdownStatus">
            <img
              class="avatar-small"
              :src="authUser.avatar"
              :alt="authUser.username"
            />

            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="../assets/images/svg/arrow-profile.svg"
                alt="icon"
              />
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
            <div class="triangle-drop"></div>

            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{ name: 'Profile' }"
                  >View profile</router-link
                >
              </li>

              <li class="dropdown-menu-item">
                <router-link
                  :to="{ name: 'Logout' }"
                  title="Log out of your account"
                  >Log out</router-link
                >
              </li>
            </ul>
          </div>
        </li>

        <li class="navbar-item">
          <router-link :to="{ name: 'Logout' }" title="Log out of your account"
            >Log out</router-link
          >
        </li>

        <!-- mobile-only -->
        <li class="navbar-mobile-item" v-if="isMobileDevice">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>

        <!-- Show these options only on mobile -->
        <li class="navbar-mobile-item" v-if="isMobileDevice">
          <router-link :to="{ name: 'Profile' }">My Profile</router-link>
        </li>
      </ul>

      <ul v-else class="navbar-list">
        <li class="navbar-item">
          <router-link :to="{ name: 'Login', query: hasQuery }"
            >Log in</router-link
          >
        </li>

        <li class="navbar-item">
          <router-link :to="{ name: 'Signup', query: hasQuery }"
            >Sign up</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      userDropdownOpen: false,
      mobileNavbarOpen: false
    }
  },

  methods: {
    switchDropdownStatus(status) {
      if (!status && typeof status === 'boolean') {
        this.userDropdownOpen = status
      } else {
        this.userDropdownOpen = !this.userDropdownOpen
      }
    },

    switchNavbarStatus() {
      this.mobileNavbarOpen = !this.mobileNavbarOpen
    }
  },

  computed: {
    ...mapGetters({
      authUser: 'auth/authUser'
    }),

    hasQuery() {
      return this.$route.name !== 'Home' &&
        this.$route.name !== 'Signup' &&
        this.$route.name !== 'Login'
        ? { redirect: this.$route.path }
        : null
    },

    isMobileDevice() {
      return (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1
      )
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

<style style="scss" scoped>
.header {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;

  height: 80px;
  padding: 0 20px;

  background: #263959;
}

.header-wrapper > a.logo {
  width: 50px;
}

.logo {
  float: left;

  padding-top: 5px;
}

.bar {
  position: absolute;

  width: 30px;
  height: 4px;

  transition: all 0.5s;

  border-radius: 10px;
  background: white;
}

.btn-hamburger-active .top {
  top: 16px;
}

.btn-hamburger-active .middle {
  overflow: hidden;

  opacity: 0;
}

.btn-hamburger-active .bottom {
  top: 16px;
}

.btn-hamburger {
  position: relative;

  display: none;
  float: right;

  width: 30px;
  height: 30px;
  margin-left: 20px;

  cursor: pointer;
}

.btn-hamburger .top {
  top: 3px;
}

.btn-hamburger .middle {
  top: 13px;
}

.btn-hamburger .bottom {
  top: 23px;
}

.navbar {
  display: flex;
  flex-direction: row-reverse;

  width: 100%;
}

.navbar-list {
  height: auto;
}

.navbar-item {
  display: inline-block;

  vertical-align: middle;

  border-right: 1px solid #3c4d6a;
}

.navbar-list .navbar-item:last-child,
.navbar-list .navbar-mobile-item:last-child {
  border-right: none;
}

.navbar-item a {
  font-size: 18px;

  padding: 10px 20px;

  transition: all 0.6s ease;
  text-decoration: none;

  color: white;
}

@media (min-width: 240px) and (max-width: 720px) {
  .header {
    width: 100%;
    height: 60px;
    padding: 0 10px;
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100%;
  }

  .header-wrapper > a.logo {
    width: 35px;
  }

  .logo {
    padding-top: 0;
  }

  .btn-hamburger {
    display: block;
  }

  .navbar {
    position: fixed;
    z-index: 10;
    top: 60px;
    left: 0;

    width: 100%;
    height: 0;

    transition: height 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);

    background: #263959;
  }

  .navbar-open {
    display: flex;

    height: 100%;
    padding: 10px 10px 10px;

    transition: all 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);

    border-top: 1px solid #fff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .navbar-list {
    position: absolute;
    top: 15px;
    right: 0;
    bottom: 0;
    left: 0;

    visibility: hidden;

    padding-left: 20px;

    transition: visibility 0s linear 1s;
  }

  .navbar-open .navbar-list {
    visibility: visible;

    transition-delay: 0s;
  }

  .navbar-item {
    display: block;
    opacity: 0;

    border: none;
  }

  .navbar-item:nth-child(1) {
    transition: opacity 0.3345s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.15s,
      transform 0.4669s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.108s;
    transform: translateY(-44px);
  }

  .navbar-item:nth-child(2) {
    transition: opacity 0.29294s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.13s,
      transform 0.45043s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.095s;
    transform: translateY(-40px);
  }

  .navbar-item:nth-child(3) {
    transition: opacity 0.33467s cubic-bezier(0.32, 0.08, 0.24, 1) 0.07s,
      transform 0.37539s cubic-bezier(0.32, 0.08, 0.24, 1) 0.06s;
    transform: translateY(-36px);
  }

  .navbar-item:nth-child(4) {
    transition: opacity 0.34577s cubic-bezier(0.32, 0.08, 0.24, 1) 0.09s,
      transform 0.39692s cubic-bezier(0.32, 0.08, 0.24, 1) 0.08s;
    transform: translateY(-32px);
  }

  .navbar-open .navbar-item:nth-child(1) {
    transition: opacity 0.3091s cubic-bezier(0.32, 0.08, 0.24, 1) 0.03s,
      transform 0.3455s cubic-bezier(0.32, 0.08, 0.24, 1) 0.02s;
  }

  .navbar-open .navbar-item:nth-child(2) {
    transition: opacity 0.32244s cubic-bezier(0.32, 0.08, 0.24, 1) 0.05s,
      transform 0.35825s cubic-bezier(0.32, 0.08, 0.24, 1) 0.04s;
  }

  .navbar-open .navbar-item {
    opacity: 1;
    /* margin: 6px 0; */

    transform: none;
  }

  .navbar-item a {
    padding: 10px 0;
  }
}
</style>
