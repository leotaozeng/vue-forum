<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
        v-model.trim.lazy="form.title"
        @blur="$v.form.title.$touch()"
      >
      <template v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="form-error">This field is required</span>
        <span v-if="!$v.form.title.minLength" class="form-error">The title must be least 10 characters long</span>
      </template>
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
        v-model.trim.lazy="form.content"
        @blur="$v.form.content.$touch()"
      ></textarea>
      <template v-if="$v.form.content.$error">
        <span v-if="!$v.form.content.required" class="form-error">This field is required</span>
        <span v-if="!$v.form.content.minLength" class="form-error">The content of the thread must be 40 characters long, Type at least 32 more</span>
      </template>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue">{{isEdit}}</button>
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

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

  validations: {
    form: {
      title: {
        required,
        minLength: minLength(10)
      },

      content: {
        required,
        minLength: minLength(32)
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
      this.$v.form.$touch()

      if (this.$v.form.$invalid) {
        alert('error')
      } else {
        this.$emit('save', { title: this.form.title, text: this.form.content })
      }
    },

    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
