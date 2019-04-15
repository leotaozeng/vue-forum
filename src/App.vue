<template>
  <div id="app">
    <TheNavbar/>

    <div class="container">
      <!-- special component -->
      <transition name="fade">
        <router-view v-show="showPage" v-on:ready="pageReady(true)"></router-view>
      </transition>

      <AppSpinner v-show="!showPage"/>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import AppSpinner from './components/AppSpinner'
import NProgress from 'nprogress'

export default {
  components: {
    TheNavbar,
    AppSpinner
  },

  data () {
    return {
      showPage: false
    }
  },

  methods: {
    pageReady (status) {
      NProgress.done()
      this.showPage = status
    }
  },

  created () {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    NProgress.start()

    // this.$router.beforeEach((to, from, next) => {
    //   NProgress.start()
    //   this.showPage = false
    //   next()
    // })
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
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
