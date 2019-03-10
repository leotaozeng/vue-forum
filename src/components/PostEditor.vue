<template>
  <div class="post-editor">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea name id cols="30" rows="10" class="form-input" v-model="text"></textarea>
      </div>

      <div class="form-actions">
        <button class="btn" v-if="isUpdate" @click.prevent="cancel">Cancel</button>

        <button class="btn-blue">{{ isUpdate ? 'Update' : 'Submit' }} post</button>
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
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid

        if (!keyIsValid) {
          console.error('The post prop must includes a `.key` attribute.')
        }
        if (!textIsValid) {
          console.error('The post prop must includes a `text` attribute.')
        }

        // console.log(valid)
        return valid
      }
    }
  },

  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },

  methods: {
    save () {
      this.isUpdate ? this.update() : this.create()
    },

    create () {
      if (this.text) {
        const payload = { threadId: this.threadId, text: this.text }

        this.$store.dispatch('createPost', payload).then(post => {
          this.text = ''
        })
      }
    },

    update () {
      if (this.text) {
        const payload = { postId: this.post['.key'], text: this.text }

        this.$store.dispatch('updatePost', payload).then(post => this.$emit('update'))
      }
    },

    cancel () {
      this.$emit('cancel')
    }
  },

  computed: {
    isUpdate () {
      return !!this.post
    }
  }
}
</script>

<style scoped>
.post-editor {
  width: 100%;
}
</style>
