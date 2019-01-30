<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea name=""
                id=""
                cols="30"
                rows="10"
                class="form-input"
                v-model="text"></textarea>
    </div>

    <div class="form-actions">
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },

  methods: {
    save () {
      // wrap all the arguments in an object
      if (this.text) {
        this.$emit('save-post', { text: this.text })
        this.text = ''
      }
    }
  }
}
</script>
