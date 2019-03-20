<template>
  <div class="col-full" :class="$style.centered">
    <h1 :class="$style.headingLarge">Not Found</h1>

    <p :class="$style.textLarge">Ooops, we couldn't find what you are looking for. Why don't you
      <router-link :to="{name: 'Home'}">go home instead?</router-link>
    </p>
  </div>
</template>

<script>
export default {
  created () {
    this.$emit('ready')
  }
}
</script>

<style lang="scss" module>
.centered {
  text-align: center;
  .headingLarge {
    font-size: 100px;
  }

  .textLarge {
    font-size: 50px;
    font-weight: 100;
  }
}
</style>
