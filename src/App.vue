<template>
  <div id="app">
    <TheNavbar />

    <div class="container">
      <!-- special component -->
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'

export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">
@import "assets/css/style";
// @import '~bootstrap/css/bootstrap.css';
</style>
