<template>
  <div class="post-editor">
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
        <button class="btn-blue">{{ isEdit }} post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    threadId: {
      type: String
    },

    post: {
      type: Object
    }
  },

  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },

  methods: {
    save () {
      this.post ? this.update() : this.create()
    },

    create () {
      if (this.text) {
        this.$store.dispatch('createPost', { threadId: this.threadId, text: this.text })
      }
    },

    update () {
      this.$emit('update', { text: this.text })
    }
  },

  computed: {
    isEdit () {
      return this.text ? 'Update' : 'Submit'
    }
  }
}
</script>

<style scoped>
.post-editor {
  width: 100%;
}
</style>
