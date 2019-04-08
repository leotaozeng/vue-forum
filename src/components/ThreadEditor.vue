<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input type="text" id="thread_title" class="form-input" name="title" v-model="form.title">
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
        v-model="form.content"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue">{{isEdit}}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      form: {
        title: this.title,
        content: this.content
      }
    }
  },

  computed: {
    isEdit () {
      return this.title ? 'Update' : 'Publish'
    }
  },

  methods: {
    save () {
      const { title, content } = this.form

      if (title && content) {
        this.$emit('save', { title, text: content })
      }
    },

    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style>
</style>
