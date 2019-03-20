<template>
  <div id="app">
    <TheNavbar/>

    <div class="container">
      <!-- special component -->
      <router-view v-show="showPage" v-on:ready="pageReady"/>

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
    pageReady () {
      NProgress.done()
      this.showPage = true
    }
  },

  created () {
    this.$router.beforeEach((to, from, next) => {
      NProgress.configure({
        speed: 100,
        showSpinner: false
      })
      NProgress.start()
      this.showPage = false
      next()
    })
  }
}
</script>

<style lang="scss">
@import "assets/css/style";
@import "~nprogress/nprogress.css";

#nprogress .bar {
  background-color: #57AD8D;
}
</style>
