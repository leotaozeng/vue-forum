// A mixin is an object
// prefix all properties of a mixin
export default {
  data() {
    return {
      asyncDataStatus_ready: false
    }
  },

  methods: {
    asyncDataStatus_fetched() {
      this.asyncDataStatus_ready = !this.asyncDataStatus_ready
      this.$emit('ready')
    }
  }
}
