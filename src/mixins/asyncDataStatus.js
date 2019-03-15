export default {
  data () {
    return {
      asyncDataStatus_ready: false
    }
  },

  methods: {
    rasyncDataStatus_fetched () {
      this.asyncDataStatus_ready = !this.asyncDataStatus_ready
    }
  }
}
