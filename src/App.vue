<template>
  <div id="app">
    <TheNavbar/>

    <div class="container">
      <!-- special component -->
      <transition name="fade" mode="out-in" v-show="showPage">
        <router-view :key="$route.path" v-on:ready="pageReady"></router-view>
      </transition>

      <AppSpinner v-show="showSpinner"/>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import AppSpinner from './components/AppSpinner'
import NProgress from 'nprogress'
import { setTimeout } from 'timers'

export default {
  components: {
    TheNavbar,
    AppSpinner
  },

  data () {
    return {
      showPage: false,
      showSpinner: true
    }
  },

  methods: {
    pageReady () {
      NProgress.done()
      this.showSpinner = false

      if (!this.showSpinner) {
        this.showPage = true
      }
    }
  },

  created () {
    NProgress.configure({
      speed: 300,
      showSpinner: false
    })
    NProgress.start()

    this.$router.beforeEach((to, from, next) => {
      this.showPage = false

      setTimeout(() => {
        NProgress.start()
        this.showSpinner = true
      }, 300)

      next()
    })
  }
}
</script>

<style lang="scss">
@import "assets/css/style";
@import "~nprogress/nprogress.css";

#nprogress .bar {
  background-color: #57ad8d;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
